import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useNetwork, useSigner } from './ethereum';
import { useStoreActions } from 'store/globalStore';
import { useContext } from 'react';
import { SUPPORTED_NETWORKS } from 'constants/networkNames';
import { ToastContext, ToastDataInterface } from 'context/toastContext';
import "utils/multiChainConstants";
import { registries, connextDomain, ConnextWeth } from '../utils/multiChainConstants';
import registry from './contracts/registry';
import {BigNumber} from 'ethers';
import { Registry } from '../../solidity/typechain/contracts/Registry';

const useRegistry = () => {
    const { setShouldUpdate } = useStoreActions((action) => action);
    const { setToastData } = useContext(ToastContext);
    const { account, library } = useWeb3React<Web3Provider>();
    const network = useNetwork(library);
    const signer = useSigner(account, library);
    const chainId = library._network.chainId;
    const getRegistryContract = () => {
        try {
            
            return new ethers.Contract(registries[chainId], registry.abi, signer);
        } catch (err) {
            console.log(err);
        }
    }

    const userDepositRequest = async (
        destinationChainId: number,
        relayerFee: BigNumber,
        slippage: BigNumber,
        underlying: string,
        amount: BigNumber,
        vaultAddress: string,
        routeId: BigNumber,
    ) => {
        const registryContract = getRegistryContract();
        const bridgeRequest: Registry.BridgeRequestStruct = {
            destinationDomain: connextDomain[destinationChainId],
            relayerFee: relayerFee,
            slippage: slippage,
            asset: ConnextWeth[chainId]
        } 
        const payload: Registry.VaultRequestStruct = {
            routeId: routeId,
            amount: amount,
            vaultAddress: vaultAddress,
            underlying: ConnextWeth[chainId],
            receiverAddress: await signer.getAddress(),
            bridgeRequest: bridgeRequest
        }
        const tx = await registryContract.connect(signer).userDepositRequest(payload);
    }

    return {
        userDepositRequest
    }

}

export default useRegistry;