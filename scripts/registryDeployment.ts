import { ethers } from "hardhat";
import { connext } from './constants';

export async function deployRegistry(connextAddress: string): Promise<string> {
    
    const RegistryFactory = await ethers.getContractFactory("Registry");

    const registry = await RegistryFactory.deploy(connextAddress);

    await registry.deployed();

    console.log("registry deployed")

    return registry.address;

}

async function main() {
    
    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();
    console.log(network?.chainId);
    if (network?.chainId) {
        const registryAddress = await deployRegistry(connext[network.chainId]);
        console.log(registryAddress);
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