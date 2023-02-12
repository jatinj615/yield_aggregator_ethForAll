import { ethers } from 'ethers';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useSigner } from './ethereum';
import { ExplorerDataType, getExplorerLink } from 'utils';
import ConvergentCurvePool from './contracts/ConvergentCurvePool';
import Vault from './contracts/vault';
import { BalancerHelpers } from './contracts/balancerHelpers';
import { v4 as uuidv4 } from 'uuid';
import { ToastContext, ToastDataInterface } from 'context/toastContext';
import { isUndefined } from 'lodash-es';
import { bnum } from 'utils/poolCalc/utils/bignumber';

const useBalancer = () => {
  const { setToastData } = useContext(ToastContext);
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);

  const getVaultContract = () => {
    return new ethers.Contract(Vault.address, Vault.abi, signer);
  };

  const getBalancerHelpersContract = () => {
    return new ethers.Contract(BalancerHelpers.address, BalancerHelpers.abi, signer);
  };
  // const getERC20Contract = (address) => {
  //   let _erc20 = erc20(address)
  //   return new ethers.Contract(_erc20.address, _erc20.abi, web3)
  // }

  const getConvergentCurvePoolContract = () => {
    return new ethers.Contract(
      ConvergentCurvePool.address, //address from balancer
      ConvergentCurvePool.abi,
      signer
    );
  };

  const swap = async (
    underlyingDecimals,
    poolId,
    tokenAddress,
    underlying,
    amount,
    symbol,
    limit,
    isBuy,
    tradeType
  ) => {
    const vault = getVaultContract();
    const now = new Date();
    now.setHours(now.getHours() + 1);
    const deadline = Math.floor(now.getTime() / 1000);
    const tx = await vault.connect(signer).swap(
      {
        poolId,
        kind: tradeType,
        assetIn: underlying,
        assetOut: tokenAddress,
        amount: ethers.utils.parseUnits(bnum(amount).dp(6, 1).toString(), underlyingDecimals),
        userData: '0x'
      },
      {
        sender: account,
        recipient: account,
        fromInternalBalance: false,
        toInternalBalance: false
      },
      ethers.utils.parseUnits(bnum(limit).dp(6, 1).toString(), underlyingDecimals), // limit
      deadline, // deadline
      {
        gasLimit: 250000
      }
    );
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
    //     title: `${isBuy ? 'Purchase' : 'Sell'} Confirmed!`,
    //     // text: `Do you wish to add ${symbol} token to your wallet?`,
    //     icon: 'success'
    //     // showConfirmButton: true,
    //     // showDenyButton: true,
    //     // confirmButtonText: `Yes`,
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
            title: `${isBuy ? 'Purchase' : 'Sell'} Confirmed!`,
            severity: 'success',
            primaryButtonType: 'BUTTON',
            primaryButtonText: 'DISMISS',
            buttonActionType: 'DISMISS'
          }
        } as ToastDataInterface;
      });
    }

    toast.success(`You can also add ${symbol} token to your wallet`, { id });
  };

  const getSwapAmount = async (poolId, tokenAddress, underlying, amount) => {
    try {
      const vault = getVaultContract();

      enum SwapKind {
        GIVEN_IN = 0,
        GIVEN_OUT = 1
      }

      const now = new Date();
      now.setHours(now.getHours() + 1);
      const deadline = Math.floor(now.getTime() / 1000);
      const rAmount = await vault.connect(signer).callStatic.swap(
        {
          poolId, //get poolID from kovan.ts
          kind: SwapKind.GIVEN_IN,
          assetIn: underlying,
          assetOut: tokenAddress,
          amount: ethers.utils.parseEther(amount),
          userData: '0x'
        },
        {
          sender: account,
          recipient: account,
          fromInternalBalance: false,
          toInternalBalance: false
        },
        ethers.utils.parseEther('0.5'), // limit
        deadline // deadline
      );
      if (rAmount) return rAmount;
      return '0';
    } catch (err) {
      return '0';
    }
  };

  const joinPool = async (
    underlyingDecimals,
    poolId,
    termAssetUnderlying,
    baseAssetUnderlying,
    termAssetAmount,
    baseAssetAmount,
    isOwnership
  ) => {
    const baseAssetAmt = ethers.utils.parseUnits(baseAssetAmount, underlyingDecimals);
    const termAssetAmt = ethers.utils.parseUnits(termAssetAmount, underlyingDecimals);
    const vault = getVaultContract();
    // We have to order these inputs
    let tokenAssets;
    let tokenAmountsIn;
    if (ethers.BigNumber.from(termAssetUnderlying).lt(baseAssetUnderlying)) {
      tokenAssets = [termAssetUnderlying, baseAssetUnderlying];
      // Will input quite a bit less token than yt
      tokenAmountsIn = [termAssetAmt, baseAssetAmt];
    } else {
      tokenAssets = [baseAssetUnderlying, termAssetUnderlying];
      // Will input quite a bit less token than yt
      tokenAmountsIn = [baseAssetAmt, termAssetAmt];
    }
    let userData;
    // const ccp = getConvergentCurvePoolContract()
    if (isOwnership) {
      userData = ethers.utils.defaultAbiCoder.encode(['uint256[]'], [tokenAmountsIn]);
    } else {
      userData = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256[]'], [1, tokenAmountsIn]);

      const amountsInSlippage = await queryJoin(poolId, tokenAssets, tokenAmountsIn, userData);
      tokenAmountsIn = amountsInSlippage;
    }

    const tx = await vault.connect(signer).joinPool(
      poolId,
      account,
      account,
      {
        assets: tokenAssets,
        maxAmountsIn: tokenAmountsIn,
        userData: userData,
        fromInternalBalance: false
      },
      {
        gasLimit: '500000'
      }
    );

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
  };

  const queryJoin = async (poolId, tokenAssets, tokenAmountsIn, userData) => {
    const balancerHelpers = getBalancerHelpersContract();

    const tx = await balancerHelpers.callStatic.queryJoin(poolId, account, account, {
      assets: tokenAssets,
      maxAmountsIn: tokenAmountsIn,
      userData,
      fromInternalBalance: false
    });

    if (tx['amountsIn']) {
      return [tx['amountsIn'][0].mul(101).div(100), tx['amountsIn'][1].mul(101).div(100)];
    }

    return tokenAmountsIn;
  };

  const exitPool = async (
    underlyingDecimals,
    poolId,
    termAssetUnderlying,
    baseAssetUnderlying,
    termAssetAmount,
    baseAssetAmount,
    assetAmount,
    isOwnership
  ) => {
    const lpAssetAmount = ethers.utils.parseUnits(assetAmount, underlyingDecimals);
    const baseAssetAmt = ethers.utils.parseUnits(bnum(baseAssetAmount).dp(6, 1).toString(), underlyingDecimals);
    const termAssetAmt = ethers.utils.parseUnits(bnum(termAssetAmount).dp(6, 1).toString(), underlyingDecimals);
    const vault = getVaultContract();
    // We have to order these inputs
    let tokenAssets;
    let tokenAmountsOut;
    if (ethers.BigNumber.from(termAssetUnderlying).lt(baseAssetUnderlying)) {
      tokenAssets = [termAssetUnderlying, baseAssetUnderlying];
      // Will input quite a bit less token than yt
      tokenAmountsOut = [termAssetAmt, baseAssetAmt];
    } else {
      tokenAssets = [baseAssetUnderlying, termAssetUnderlying];
      // Will input quite a bit less token than yt
      tokenAmountsOut = [baseAssetAmt, termAssetAmt];
    }
    // const ccp = getConvergentCurvePoolContract()
    let userData;
    //NOTE: Uncomment the below if-else block and remove lines from 287-290 if userData needs to be updated ad we do for joinPool

    if (isOwnership) {
      userData = ethers.utils.defaultAbiCoder.encode(['uint256[]'], [tokenAmountsOut]);
    } else {
      userData = ethers.utils.defaultAbiCoder.encode(['uint256', 'uint256'], [1, lpAssetAmount]);

      const amountsOutSlippage = await queryExit(poolId, tokenAssets, tokenAmountsOut, userData);
      tokenAmountsOut = amountsOutSlippage;
    }

    const tx = await vault.connect(signer).exitPool(
      poolId,
      account,
      account,
      {
        assets: tokenAssets,
        minAmountsOut: tokenAmountsOut,
        userData: userData,
        toInternalBalance: false
      },
      {
        gasLimit: '500000'
      }
    );

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
  };

  const queryExit = async (poolId, tokenAssets, tokenAmountsOut, userData) => {
    const balancerHelpers = getBalancerHelpersContract();

    const tx = await balancerHelpers.callStatic.queryExit(poolId, account, account, {
      assets: tokenAssets,
      minAmountsOut: tokenAmountsOut,
      userData,
      toInternalBalance: false
    });

    if (tx['amountsOut']) {
      return [tx['amountsOut'][0].mul(99).div(100), tx['amountsOut'][1].mul(99).div(100)];
    }

    return tokenAmountsOut;
  };

  return {
    swap,
    getSwapAmount,
    joinPool,
    exitPool
  };
};

export default useBalancer;
