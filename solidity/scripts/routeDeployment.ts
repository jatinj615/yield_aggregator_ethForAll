import { ethers } from "hardhat";
import { registries, AaveWeth } from './constants';
import { verifyContract } from "./uitls";
import { addRoute } from "./registryFunctions";

async function deployRoute(registryAddress: string): Promise<string> {

    const RouteFactory = await ethers.getContractFactory("AaveRoute");

    const route = await RouteFactory.deploy(registryAddress);

    const tx = await route.deployed();

    await tx.deployTransaction.wait(5);

    console.log("route deployed")

    console.log("adding route to registry");

    await addRoute(route.address, registryAddress);

    console.log("route added to registry");
    
    return route.address;

}

export async function deployAaveWETHRoute(registryAddress: string, chainId: number): Promise<string> {

    const RouteFactory = await ethers.getContractFactory("AaveWETHTestnetRoute");

    const route = await RouteFactory.deploy(registryAddress, AaveWeth[chainId]);

    const tx = await route.deployed();

    await tx.deployTransaction.wait(5);

    console.log("route deployed")

    console.log("adding route to registry");

    await addRoute(route.address, registryAddress);

    console.log("route added to registry");
    
    return route.address;

}


async function main() {
    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();

    if (network?.chainId) {
        console.log("deploying route..")
        // const routeAddress = await deployRoute(registries[network.chainId]);
        const routeAddress = await deployAaveWETHRoute(registries[network.chainId], network.chainId);
        console.log(routeAddress);

        // verify Contract
        await verifyContract(routeAddress, [registries[network.chainId], AaveWeth[network.chainId]]);

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