import { ethers } from "hardhat";
import { connext } from './constants';
import { Registry } from '../typechain/contracts/Registry';
import { Contract } from 'ethers';
import { Registry__factory } from '../typechain/factories/contracts/Registry__factory';

// Management functions
async function addRoute(routeAddress: string, registryAddress: string) {

    let routeData: Registry.RouteDataStruct[] = [{
        route: routeAddress,
        isEnabled: true
    }];

    const [signer] = await ethers.getSigners();

    const registryFactory = new Registry__factory(signer);
    const registryContract = registryFactory.attach(registryAddress);

    const tx = await registryContract.addRoute(routeData);
    
}

async function disableRoute(routeId: number, registryContract: Contract) {
    const tx = await registryContract.disableRoute(routeId);
}

async function addRegistryForDomain(remoteRegistries: Registry.RemoteRegistryStruct[], registryContract: Contract) {
    const tx = await registryContract.addRemoteRegistry(remoteRegistries);
}

// User interfacing functions



export {
    addRoute,
    disableRoute,
    addRegistryForDomain
}