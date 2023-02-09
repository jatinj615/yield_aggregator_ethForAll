import { ethers } from "hardhat";
import { connext } from './constants';
import { Registry } from '../typechain/contracts/Registry';
import { Contract } from 'ethers';


async function addRoute(routeData: Registry.RouteDataStruct[], registryContract: Contract) {

    const tx = await registryContract.addRoute(routeData);

}

async function disableRoute(routeId: number, registryContract: Contract) {
    const tx = await registryContract.disableRoute(routeId);
}

async function addRegistryForDomain(remoteRegistries: Registry.RemoteRegistryStruct[], registryContract: Contract) {
    const tx = await registryContract.addRemoteRegistry(remoteRegistries);
}