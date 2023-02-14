import { BigNumber, ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useSigner } from './ethereum';
import core from './contracts/core';
import { useStoreActions } from 'store/globalStore';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { ExplorerDataType, getExplorerLink } from 'utils';
import futureBase from './contracts/FutureBase';
import { v4 as uuidv4 } from 'uuid';
import { ToastContext, ToastDataInterface } from 'context/toastContext';
import { isUndefined } from 'lodash-es';

const useUnrealCore = (streamKey: string) => {
  const { setShouldUpdate } = useStoreActions((action) => action);
  const { setToastData } = useContext(ToastContext);
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);

  const getCoreContract = () => {
    try {
      return new ethers.Contract(core.address, core.abi, signer);
    } catch (err) {
      console.log(err);
    }
  };

  const getFutureContract = (epochAddress) => {
    try {
      return new ethers.Contract(epochAddress, futureBase.abi, signer);
    } catch (err) {
      console.log(err);
    }
  };

  const getYieldValue = async (epochAddress: string, ytBalance: BigNumber) => {
    const epoch = new ethers.Contract(epochAddress, futureBase.abi, signer);
    const yieldCurrent = await epoch.yield();
    const totalSupply = await epoch.totalSupplyYT();
    return yieldCurrent.mul(ytBalance).div(totalSupply);
  };

  const getMeta = (protocol: string, underlyingToken: string, durationSeconds: number): string => {
    return ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(
        ['string', 'address', 'uint256'],
        [protocol, underlyingToken, durationSeconds]
      )
    );
  };

  const mint = async (
    amountUnderlying: ethers.BigNumber,
    otAddress: string,
    ytAddress: string,
    protocol: string,
    underlyingToken: string,
    durationSeconds: number,
    oTSymbol: string,
    yTSymbol: string
  ) => {
    try {
      const core = getCoreContract();

      const meta = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ['string', 'address', 'uint256'],
          [protocol, underlyingToken, durationSeconds]
        )
      );
      const tx = await core.connect(signer).deposit(meta, amountUnderlying);
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
              link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION)}`
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

      // TODO: Find alternative for this
      // Swal.fire({
      //     title: 'Subscription Confirmed!',
      //     // text: 'Do you wish to add Ownership token and Yield Token to your wallet?',
      //     icon: 'success'
      //     // showConfirmButton: true,
      //     // showDenyButton: true,
      //     // confirmButtonText: `Close`,
      //     // denyButtonText: `Nope`
      // });

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
  };

  const unsubscribe = async (otAmountToBurn: ethers.BigNumber) => {
    const core = getCoreContract();
    const tx = await core.connect(signer).unsubscribe(streamKey, otAmountToBurn);
    const { hash } = tx;
    // * toast message
    const id = uuidv4();

    if (!isUndefined(setToastData)) {
      setToastData((prevContext) => {
        return {
          // object that we want to update
          ...(prevContext || {}), // keep all other key-value pairs
          [id]: {
            primaryButtonType: 'ANCHOR',
            linkType: 'EXTERNAL',
            primaryButtonText: 'VIEW ON ETHERSCAN',
            link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION)}`
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

    setShouldUpdate(true);
  };

  const claimPlatformTokens = async () => {
    const core = getCoreContract();
    const tx = await core.connect(signer).claimPlatformTokens(streamKey, account);
    const { hash } = tx;

    // * toast message
    const id = uuidv4();

    if (!isUndefined(setToastData)) {
      setToastData((prevContext) => {
        return {
          // object that we want to update
          ...(prevContext || {}), // keep all other key-value pairs
          [id]: {
            primaryButtonType: 'ANCHOR',
            linkType: 'EXTERNAL',
            primaryButtonText: 'VIEW ON ETHERSCAN',
            link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION)}`
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

    setShouldUpdate(true);
  };

  const redeemYield = async (epoch: number) => {
    const core = getCoreContract();
    const tx = await core.connect(signer).redeemYield(streamKey, epoch);
    const { hash } = tx;

    // * toast message
    const id = uuidv4();

    if (!isUndefined(setToastData)) {
      setToastData((prevContext) => {
        return {
          // object that we want to update
          ...(prevContext || {}), // keep all other key-value pairs
          [id]: {
            primaryButtonType: 'ANCHOR',
            linkType: 'EXTERNAL',
            primaryButtonText: 'VIEW ON ETHERSCAN',
            link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION)}`
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

    setShouldUpdate(true);
  };

  const getYieldRemaining = async (epoch) => {
    const core = getCoreContract();
    const response = await core.connect(signer).getYieldRemaining(streamKey, epoch);
    return response;
  };

  const redeemPrinciple = async (epoch: number) => {
    const core = getCoreContract();
    const tx = await core.connect(signer).redeemPrinciple(streamKey, epoch, { gasLimit: 12450000 });
    const { hash } = tx;

    // * toast message
    const id = uuidv4();

    if (!isUndefined(setToastData)) {
      setToastData((prevContext) => {
        return {
          // object that we want to update
          ...(prevContext || {}), // keep all other key-value pairs
          [id]: {
            primaryButtonType: 'ANCHOR',
            linkType: 'EXTERNAL',
            primaryButtonText: 'VIEW ON ETHERSCAN',
            link: `${getExplorerLink(hash, ExplorerDataType.TRANSACTION)}`
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

    setShouldUpdate(true);
  };

  const getOTYTCount = async (amountUnderlying) => {
    const core = getCoreContract();

    const response = await core.connect(signer).getOTYTCount(streamKey, amountUnderlying);
    if (response) return { ot: response[0], yt: response[1] };
    return { ot: BigNumber.from(1), yt: BigNumber.from(1) };
  };

  const getApy = async (epochAddress) => {
    const future = getFutureContract(epochAddress);

    const response = await future.connect(signer).getAPY();
    return response;
  };

  const getYield = async (epochAddress) => {
    const future = getFutureContract(epochAddress);

    const response = await future.connect(signer).yield();
    return response;
  };

  return {
    mint,
    unsubscribe,
    claimPlatformTokens,
    redeemPrinciple,
    redeemYield,
    getOTYTCount,
    getYieldValue,
    getYieldRemaining,
    getApy,
    getYield
  };
};

export default useUnrealCore;
