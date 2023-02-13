import { ethers } from "hardhat";
import { connext } from './constants';
import { userDepositRequest } from "./registryFunctions";
import { Registry } from '../typechain/contracts/Registry';
import { Signer } from "ethers";
import { create, SdkConfig } from "@connext/sdk";




async function deposit(signer: Signer, chainId: number) {

    const amount = 

    const bridgerequest: Registry.BridgeRequestStruct = {
        destinationDomain: "",
        relayerFee: "",
        slippage: "",
        asset: ""

    }

    const vaultRequest: Registry.VaultRequestStruct = {
        routeId: ethers.BigNumber.from('0'),
        amount: ethers.utils.parseUnits("100", "gwei"),
        vaultAddress:"",
        underlying:"",
        receiverAddress: await signer.getAddress(),
        bridgeRequest: 

    }

}


async function main() {
    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();

    if (network?.chainId) {

        await deposit(signer, network.chainId)

    } else {
        console.log("Network not found");
    }

}


main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });