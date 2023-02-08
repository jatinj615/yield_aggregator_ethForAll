import { ethers } from "hardhat";
import { connext } from './constants';
import { Registry } from '../typechain/contracts/Registry';
import { Contract } from 'ethers';


export async function addRoute(routeData: Registry.RouteDataStruct, registryContract: Contract) {

    const tx = await registryContract.addRoute(routeData);

    const results = await tx.wait();
    console.log(results.logs);

}