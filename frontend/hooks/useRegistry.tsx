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
import { isUndefined, toString } from 'lodash-es';
import { ExplorerDataType, getExplorerLink } from 'utils';
import { Registry__factory } from './contracts/Registry__factory';


const useRegistry = () => {
    const { setShouldUpdate } = useStoreActions((action) => action);
    const { setToastData } = useContext(ToastContext);
    const { account, library } = useWeb3React<Web3Provider>();
    const network = useNetwork(library);
    const signer = useSigner(account, library);
    const chainId = library._network.chainId;
    const getRegistryContract = () => {
        try {
            const registryFactory = new Registry__factory(signer);
            const registry = registryFactory.attach(registries[chainId]);
            return registry;
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
            const relayerFee = ethers.BigNumber.from("32901718860961600");
            
            const bridgeRequest: Registry.BridgeRequestStruct = {
                destinationDomain: connextDomain[destinationChainId],
                relayerFee: relayerFee,
                slippage: slippage
            } 
            const payload: Registry.VaultRequestStruct = {
                routeId: routeId,
                amount: amount,
                vaultAddress: "0x7b5C526B7F8dfdff278b4a3e045083FBA4028790",
                underlying: underlying,
                receiverAddress: await signer.getAddress(),
                bridgeRequest: bridgeRequest
            }
            console.log(payload);
            const registryContract = getRegistryContract();
            let tx;
            if(destinationChainId != chainId) {
                tx = await registryContract.connect(signer).userDepositRequest(payload, {value: relayerFee});
            } else {
                console.log("same chain tx");
                tx = await registryContract.connect(signer).userDepositRequest(payload);
            }

            const { hash } = tx;
            console.log(tx);
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

            toast.success('', { id });
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