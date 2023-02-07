import { ethers } from "hardhat";
import { connext } from './constrants';

export async function deployRegistry(connextAddress: string) {
    
    const RegistryFactory = await ethers.getContractFactory("Registry");

    const registry = await RegistryFactory.deploy(connextAddress);

    await registry.deployed();


}

async function main() {
    
    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();

    if (network?.chainId) {
    }
    



}


main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });