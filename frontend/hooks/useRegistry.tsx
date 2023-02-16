import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useNetwork, useSigner } from './ethereum';
import { useStoreActions } from 'store/globalStore';
import { useContext } from 'react';
import { SUPPORTED_NETWORKS } from 'constants/networkNames';
import { ToastContext, ToastDataInterface } from 'context/toastContext';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import "utils/multiChainConstants";
import { registries, connextDomain, ConnextWeth } from '../utils/multiChainConstants';
import registry from './contracts/registry';
import {BigNumber} from 'ethers';
import { Registry } from './contracts/RegistryType';
import { isUndefined } from 'lodash-es';
import { ExplorerDataType, getExplorerLink } from 'utils';

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
        slippage: BigNumber,
        underlying: string,
        amount: BigNumber,
        vaultAddress: string,
        routeId: BigNumber,
    ) => {
        try {
            const registryContract = getRegistryContract();
            const bridgeRequest: Registry.BridgeRequestStruct = {
                destinationDomain: connextDomain[destinationChainId],
                relayerFee: relayerFee,
                slippage: slippage,
                asset: underlying
            }
            const payload: Registry.VaultRequestStruct = {
                routeId: routeId,
                amount: amount,
                vaultAddress: vaultAddress,
                underlying: underlying,
                receiverAddress: await signer.getAddress(),
                bridgeRequest: bridgeRequest
            }
            const tx = await registryContract.connect(signer)
                .userDepositRequest(payload);

            const { hash } = tx;

            // * toast message
            let id = uuidv4();

            if (!isUndefined(setToastData)) {
                setToastData((prevContext) => {
                return {
                    // object that we want to update
                    ...(prevContext || {}), // keep all other key-value pairs
                    [id]: {
                    primaryButtonType: 'ANCHOR',
                    linkType: 'EXTERNAL',
                    primaryButtonText: 'VIEW ON ETHERSCAN',
                    link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION, chainId)}`
                    }
                } as ToastDataInterface;
                });
            }

            await toast.promise(
                tx.wait(),
                {
                loading: 'Transaction Pending...',
                success: 'Transaction Completed',
                error: 'Transaction Failed'
                },
                { id }
            );

            // * toast message
            id = uuidv4();

            if (!isUndefined(setToastData)) {
                setToastData((prevContext) => {
                // object that we want to update
                return {
                    // keep all other key-value pairs
                    ...(prevContext || {}),
                    [id]: {
                    title: 'Subscription Confirmed',
                    severity: 'success',
                    primaryButtonType: 'BUTTON',
                    primaryButtonText: 'DISMISS',
                    buttonActionType: 'DISMISS'
                    }
                } as ToastDataInterface;
                });
            }

            toast.success('You can also add Ownership token and Yield Token to your wallet', { id });
        } catch (err) {
            toast.error('An Error Occurred');
            console.log(err);
            throw new Error(err.message);
        }
    }

    return {
        userDepositRequest,
        getRegistryContract
    }

}

export default useRegistry;