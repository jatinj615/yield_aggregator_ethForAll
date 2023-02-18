import { expect } from "chai";
import { deployRegistry } from "../scripts/registryDeployment";
import registry from '../../frontend/hooks/contracts/registry';
import { Contract } from 'ethers';
import { ChainId } from '../../frontend/enums/chainId';
import { ethers } from "hardhat";
import { AaveWeth, connext, connextDomain } from '../scripts/constants';
import { deployAaveWETHRoute } from "../scripts/routeDeployment";
import { Registry } from '../typechain/contracts/Registry';
import {Signer} from 'ethers';
import { Registry__factory } from '../typechain/factories/contracts/Registry__factory';
import { ERC20__factory } from "@connext/smart-contracts";
import { sign } from "crypto";

describe("Deploy registry and route for aave testnet and check user deposit", () => {
    let registry:Registry;
    let signer: Signer;

    it("should try to deposit in the aave vault", async() => {
        [signer] = await ethers.getSigners();
        console.log(await signer.getAddress())
        const network = await signer.provider?.getNetwork();
        console.log(network?.chainId)
        console.log(connext[5])
        const RegistryFactory = await ethers.getContractFactory("Registry");

        const registry = await RegistryFactory.deploy(connext[5]);

        await registry.deployed();
        console.log("registry address: ", registry.address);
        
        console.log("deploy route");

        const RouteFactory = await ethers.getContractFactory("AaveWETHTestnetRoute");

        const route = await RouteFactory.deploy(registry.address, AaveWeth[5]);

        await route.deployed();

        console.log("route deployed");
        console.log("adding route");
        
        let routeData: Registry.RouteDataStruct[] = [{
            route: route.address,
            isEnabled: true
        }];

        await registry.addRoute(routeData);
        console.log("route added");

        console.log(await registry.routes(ethers.BigNumber.from(0)));

        const bridgeRequest: Registry.BridgeRequestStruct = {
            destinationDomain: connextDomain[5],
            relayerFee: ethers.BigNumber.from('32901718860961600'),
            slippage: ethers.BigNumber.from('30')
        }
        
        const payload: Registry.VaultRequestStruct = {
            routeId: 0,
            amount: ethers.BigNumber.from("1000000000000000"),
            vaultAddress: "0x368eedf3f56ad10b9bc57eed4dac65b26bb667f6",
            underlying: "0x368eedf3f56ad10b9bc57eed4dac65b26bb667f6",
            receiverAddress: await signer.getAddress(),
            bridgeRequest: bridgeRequest
        }

        const erc20Factory = new ERC20__factory(signer);
        const underlying = erc20Factory.attach("0x368eedf3f56ad10b9bc57eed4dac65b26bb667f6");
        await underlying.approve(registry.address, payload.amount);

        await registry.userDepositRequest(payload, {gasLimit: 2500000, value: 0});
    })
})