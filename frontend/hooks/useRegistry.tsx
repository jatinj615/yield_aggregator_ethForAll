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
import { isUndefined, toString } from 'lodash-es';
import { ExplorerDataType, getExplorerLink } from 'utils';
import { getConnextData } from '../utils/getConnextData';

type BridgeRequestStruct = {
    destinationDomain: BigNumber;
    relayerFee: BigNumber;
    slippage: BigNumber;
};

type VaultRequestStruct = {
    routeId: BigNumber;
    amount: BigNumber;
    vaultAddress: string;
    underlying: string;
    receiverAddress: string;
    bridgeRequest: BridgeRequestStruct;
};


const useRegistry = () => {
    const { setShouldUpdate } = useStoreActions((action) => action);
    const { setToastData } = useContext(ToastContext);
    const { account, library } = useWeb3React<Web3Provider>();
    const network = useNetwork(library);
    const signer = useSigner(account, library);
    const chainId = library._network.chainId;
    const getRegistryContract = () => {
        try {
            let abi = [
                'function userDepositRequest(VaultRequest calldata _depositRequest) external payable',
                'function userWithdrawRequest(VaultRequest calldata _withdrawRequest) external payable returns(uint256)'
            ]
            const registry = new ethers.Contract(registries[chainId], abi, signer);
            return registry;
        } catch (err) {
            console.log(err);
        }
    }

    const userDepositRequest = async (
        destinationChainId: number,
        underlying: string,
        amount: BigNumber,
        vaultAddress: string,
        routeId: BigNumber,
    ) => {
        try {

            let relayerFee: BigNumber = ethers.BigNumber.from('0');
            let slippage: BigNumber = ethers.BigNumber.from('0');
            // TODO: add relayer fee API
            if(destinationChainId != chainId) {
                const connextSDKResponse = await getConnextData(chainId, destinationChainId, amount.toString());
                console.log((connextSDKResponse));
                
                relayerFee = ethers.BigNumber.from(String(connextSDKResponse.relayerFee));
                // Note: For Demo Purpose passing the triple relayer fee
                relayerFee = relayerFee.mul(ethers.BigNumber.from('3'));
                slippage = ethers.BigNumber.from(String(connextSDKResponse.destinationSlippage));
                // Note: For Demo purpose passing the slippage as 3%
                slippage = ethers.BigNumber.from("300");
            }
            const bridgeRequest: BridgeRequestStruct = {
                destinationDomain: ethers.BigNumber.from(connextDomain[destinationChainId].toString()),
                relayerFee: relayerFee,
                slippage: slippage
            } 
            const payload: VaultRequestStruct = {
                routeId: routeId,
                amount: amount,
                vaultAddress: vaultAddress,
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