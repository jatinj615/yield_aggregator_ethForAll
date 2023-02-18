import { ethers } from "hardhat";
import { connext } from './constants';
import { verifyContract } from "./uitls";

export async function deployRegistry(connextAddress: string): Promise<string> {
    
    const RegistryFactory = await ethers.getContractFactory("Registry");

    const registry = await RegistryFactory.deploy(connextAddress);
    
    const tx = await registry.deployed();

    await tx.deployTransaction.wait(5)

    console.log("registry deployed")

    return registry.address;

}

async function main() {
    
    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();

    if (network?.chainId) {
        const registryAddress = await deployRegistry(connext[network.chainId]);
        console.log(registryAddress);
        // verify Contract
        await verifyContract(registryAddress, [connext[network.chainId]]);
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