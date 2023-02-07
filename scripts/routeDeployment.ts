import { ethers } from "hardhat";
import { connext } from './constants';

async function deployRoute(registryAddress: string): Promise<string> {

    const RouteFactory = await ethers.getContractFactory("AaveRoute");

    const route = await RouteFactory.deploy(registryAddress);

    await route.deployed();

    return route.address;

}

async function main() {
    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();
    console.log(network?.chainId);
    if (network?.chainId) {
        const routeAddress = await deployRoute(connext[network.chainId]);
        console.log(routeAddress);
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