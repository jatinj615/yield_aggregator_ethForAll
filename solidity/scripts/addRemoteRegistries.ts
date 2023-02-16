import { ethers } from "hardhat";
import { connextDomain, connext, registries } from './constants';
import { Registry } from '../typechain/contracts/Registry';
import { Registry__factory } from '../typechain/factories/contracts/Registry__factory';
import {Signer} from 'ethers';


async function addRemoteRegistries(chainId: number, signer: Signer) {

    const keys = Object.keys(connextDomain);

    let remoteRegistries: Registry.RemoteRegistryStruct[] = [];
    console.log(keys);
    for(let i = 0 ; i < keys.length; i++) {
        if (Number(keys[i]) != chainId) {
            remoteRegistries.push(
                {
                    domainId: connextDomain[Number(keys[i])],
                    reomoteRegistry: registries[Number(keys[i])]
                }
            )
        }

    }

    console.log(remoteRegistries);

    console.log("adding remote registries..")

    const registryFactory = new Registry__factory(signer);
    const registry = registryFactory.attach(registries[chainId]);

    await registry.addRemoteRegistry(remoteRegistries);

    console.log("remote registries added");

}

async function main() {

    const [signer] = await ethers.getSigners();
    const network = await signer.provider?.getNetwork();

    if (network?.chainId) {
        await addRemoteRegistries(network.chainId, signer);
        // console.log(registryAddress);
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
