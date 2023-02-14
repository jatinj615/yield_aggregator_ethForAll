import { ethers } from 'ethers';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useStoreActions } from 'store/globalStore';
import { Button, Grid, useTheme } from '@mui/material';
import ApprovalCard from 'components/Common/ApprovalCard';
import Loader from 'components/Common/Loader';
import MaxInput from 'components/Common/Maxinput';
import SkeletonLoader from 'components/Common/SkeletonLoader';
import { useNetwork } from 'hooks/ethereum';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useERC20 from 'hooks/useERC20';
import useBalancer from 'hooks/useBalancer';
import Vault from 'hooks/contracts/vault';
import toast from 'react-hot-toast';
import { formatNumber, intlFormatNumber, isIncorrectNumberFormat } from 'utils';
import { constantStrings } from 'utils/constants';
import { bnum } from 'utils/poolCalc/utils/bignumber';
import { SUPPORTED_NETWORK } from 'constants/networkNames';
import { ToastContext } from 'context/toastContext';

export default function AddLiquidity({
  poolId,
  poolType,
  underlyingDecimals,
  termAssetUnderlying,
  termAssetSymbol,
  baseAssetUnderlying,
  baseAssetSymbol,
  termToBaseRatio
}) {
  const { setShouldUpdate } = useStoreActions((action) => action);
  const ERC20 = useERC20();
  const termAssetUnderlyingToken = useMemo(() => {
    if (termAssetUnderlying) return ERC20(termAssetUnderlying);
  }, [ERC20, termAssetUnderlying]);
  const baseAssetUnderlyingToken = useMemo(() => {
    if (baseAssetUnderlying) return ERC20(baseAssetUnderlying);
  }, [ERC20, baseAssetUnderlying]);
  const { joinPool } = useBalancer();
  const theme = useTheme();
  const { setShowConnectWalletModal } = useContext(ToastContext);
  const { active, library } = useWeb3React<Web3Provider>();
  const network = useNetwork(library);

  const [baseAssetAmount, setBaseAssetAmount] = useState<string>('');
  const [baseAssetAmountError, setBaseAssetAmountError] = useState<boolean>(false);
  const [termAssetAmount, setTermAssetAmount] = useState<string>('');
  const [termAssetAmountError, setTermAssetAmountError] = useState<boolean>(false);
  const [txPending, setTxPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tokensLoading, setTokensLoading] = useState<boolean>(true);
  const [termAssetApprovalPending, setTermAssetApprovalPending] = useState<boolean>(false);
  const [baseAssetApprovalPending, setBaseAssetApprovalPending] = useState<boolean>(false);
  const [isTermAssetApproving, setIsTermAssetApproving] = useState<boolean>(false);
  const [isBaseAssetApproving, setIsBaseAssetApproving] = useState<boolean>(false);
  const [baseAssetApprovedLimit, setBaseApprovedLimit] = useState<ethers.BigNumber>(ethers.constants.MaxUint256);
  const [baseAssetBalance, setBaseAssetBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from('0'));
  const [termAssetApprovedLimit, setTermApprovedLimit] = useState<ethers.BigNumber>(ethers.constants.MaxUint256);
  const [termAssetBalance, setTermAssetBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from('0'));

  const termAssetApprovalMessage = useMemo(
    () =>
      `Unreal uses Balancer Pools for trading. You\'ll need to grant Balancer approval to spend your ${termAssetSymbol} in order to perform this transaction.`,
    [termAssetSymbol]
  );
  const baseAssetApprovalMessage = useMemo(
    () =>
      `Unreal uses Balancer Pools for trading. You\'ll need to grant Balancer approval to spend your ${baseAssetSymbol} in order to perform this transaction.`,
    [baseAssetSymbol]
  );

  useEffect(() => {
    if (network) {
      setLoading(true);
      setTokensLoading(true);
      setTermAssetAmount('');
      setBaseAssetAmount('');
      resetInputErrors();
    }
  }, [active, network, termAssetUnderlying, baseAssetUnderlying]);

  useEffect(() => {
    const fetch = async () => {
      if (termAssetUnderlyingToken?.approve && baseAssetUnderlyingToken?.approve && tokensLoading) {
        setTokensLoading(false);

        try {
          {
            const balance = await termAssetUnderlyingToken.getBalance();
            setTermAssetBalance(balance);

            const limit = await termAssetUnderlyingToken.getAllowance(Vault.address);
            setTermApprovedLimit(limit);
          }
          {
            const balance = await baseAssetUnderlyingToken.getBalance();
            setBaseAssetBalance(balance);

            const limit = await baseAssetUnderlyingToken.getAllowance(Vault.address);
            setBaseApprovedLimit(limit);
          }
        } catch (error) {
          console.error('Error from add liquidity ERC20 API', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetch();
  }, [termAssetUnderlyingToken, baseAssetUnderlyingToken, tokensLoading]);

  const resetInputErrors = () => {
    setTermAssetAmountError(false);
    setBaseAssetAmountError(false);
  };

  const handleTermAssetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetInputErrors();
    const newTermAssetAmount: string = e.target.value;
    if (newTermAssetAmount) {
      setTermAssetAmount(newTermAssetAmount);
      if (isIncorrectNumberFormat(newTermAssetAmount)) {
        setTermAssetAmountError(true);
      } else {
        const newB = parseFloat(ethers.utils.formatUnits(termAssetBalance, underlyingDecimals));
        const newI = parseFloat(newTermAssetAmount);
        if (newI > newB) {
          setTermAssetAmountError(true);
        } else {
          setBaseAssetAmount(formatNumber(Number(newTermAssetAmount) / termToBaseRatio, 6));
          const newB = parseFloat(ethers.utils.formatUnits(baseAssetBalance, underlyingDecimals));
          const newI = parseFloat((Number(newTermAssetAmount) / termToBaseRatio).toString());
          setBaseAssetAmountError(newI > newB);
        }
      }
    } else {
      setTermAssetAmount('');
      setBaseAssetAmount('');
    }
  };

  const handleClickTermAssetMaxBtn = () => {
    resetInputErrors();
    const termAssetMaxValue = parseFloat(ethers.utils.formatUnits(termAssetBalance, underlyingDecimals));
    const maxAmount = formatNumber(termAssetMaxValue, 6);
    const baseAssetNewValue = parseFloat((Number(maxAmount) / termToBaseRatio).toString());
    const baseAssetAvl = parseFloat(ethers.utils.formatUnits(baseAssetBalance, underlyingDecimals));
    setTermAssetAmount(maxAmount);
    setBaseAssetAmount(formatNumber(Number(maxAmount) / termToBaseRatio, 6));
    setBaseAssetAmountError(baseAssetNewValue > baseAssetAvl);
  };

  const handleBaseAssetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetInputErrors();
    const newBaseAssetAmount: string = e.target.value;
    if (newBaseAssetAmount) {
      setBaseAssetAmount(newBaseAssetAmount);
      if (isIncorrectNumberFormat(newBaseAssetAmount)) {
        setBaseAssetAmountError(true);
      } else {
        const newB = parseFloat(ethers.utils.formatUnits(baseAssetBalance, underlyingDecimals));
        const newI = parseFloat(newBaseAssetAmount);
        if (newI > newB) {
          setBaseAssetAmountError(true);
        } else {
          setTermAssetAmount(formatNumber(Number(newBaseAssetAmount) * termToBaseRatio, 6));
          const newB = parseFloat(ethers.utils.formatUnits(termAssetBalance, underlyingDecimals));
          const newI = parseFloat((Number(newBaseAssetAmount) * termToBaseRatio).toString());
          setTermAssetAmountError(newI > newB);
        }
      }
    } else {
      setBaseAssetAmount('');
      setTermAssetAmount('');
    }
  };

  const handleClickBaseAssetMaxBtn = () => {
    resetInputErrors();
    const baseAssetMaxValue = parseFloat(ethers.utils.formatUnits(baseAssetBalance, underlyingDecimals));
    const maxAmount = formatNumber(baseAssetMaxValue, 6);
    const termAssetNewValue = parseFloat((Number(maxAmount) * termToBaseRatio).toString());
    const termAssetAvl = parseFloat(ethers.utils.formatUnits(termAssetBalance, underlyingDecimals));
    setBaseAssetAmount(maxAmount);
    setTermAssetAmount(formatNumber(Number(maxAmount) * termToBaseRatio, 6));
    setTermAssetAmountError(termAssetNewValue > termAssetAvl);
  };

  const handleConnect = () => {
    setShowConnectWalletModal(true);
  };

  const handleSubmit = async () => {
    setTxPending(true);

    try {
      const baseAssetToBuy = ethers.utils.parseUnits(baseAssetAmount, underlyingDecimals);
      const termAssetToBuy = ethers.utils.parseUnits(termAssetAmount, underlyingDecimals);

      if (baseAssetApprovedLimit.gte(baseAssetToBuy) && termAssetApprovedLimit.gte(termAssetToBuy)) {
        await joinPool(
          underlyingDecimals,
          poolId,
          termAssetUnderlying,
          baseAssetUnderlying,
          termAssetAmount,
          baseAssetAmount,
          poolType === 'Unreal'
        );

        setTermAssetAmount('');
        setBaseAssetAmount('');
        setShouldUpdate(true);
        const termAssetBalance = await termAssetUnderlyingToken.getBalance();
        setTermAssetBalance(termAssetBalance);
        const baseAssetBalance = await baseAssetUnderlyingToken.getBalance();
        setBaseAssetBalance(baseAssetBalance);
        const termAssetlimit = await termAssetUnderlyingToken.getAllowance(Vault.address);
        setTermApprovedLimit(termAssetlimit);
        const baseAssetLimit = await baseAssetUnderlyingToken.getAllowance(Vault.address);
        setBaseApprovedLimit(baseAssetLimit);
      } else {
        if (!termAssetApprovedLimit.gte(termAssetToBuy)) {
          setTermAssetApprovalPending(true);
        }
        if (!baseAssetApprovedLimit.gte(baseAssetToBuy)) {
          setBaseAssetApprovalPending(true);
        }
      }
    } finally {
      setTxPending(false);
    }
  };

  const handleTermAssetApprove = async () => {
    setIsTermAssetApproving(true);

    try {
      const tx = await termAssetUnderlyingToken.approve(ethers.constants.MaxUint256, Vault.address);

      await toast.promise(tx.wait(), {
        loading: `${termAssetSymbol} ${constantStrings.approvalPending}`,
        success: `${termAssetSymbol} ${constantStrings.approvalCompleted}`,
        error: `${termAssetSymbol} ${constantStrings.approvalFailed}`
      });

      const termAssetlimit = await termAssetUnderlyingToken.getAllowance(Vault.address);
      setTermApprovedLimit(termAssetlimit);
      setTermAssetApprovalPending(false);
    } catch (error) {
      console.error('Error from add liquidity term asset approval', error);
    } finally {
      setIsTermAssetApproving(false);
    }
  };

  const handleBaseAssetApprove = async () => {
    setIsBaseAssetApproving(true);

    try {
      const tx = await baseAssetUnderlyingToken.approve(ethers.constants.MaxUint256, Vault.address);

      await toast.promise(tx.wait(), {
        loading: `${baseAssetSymbol} ${constantStrings.approvalPending}`,
        success: `${baseAssetSymbol} ${constantStrings.approvalCompleted}`,
        error: `${baseAssetSymbol} ${constantStrings.approvalFailed}`
      });

      const baseAssetLimit = await baseAssetUnderlyingToken.getAllowance(Vault.address);
      setBaseApprovedLimit(baseAssetLimit);
      setBaseAssetApprovalPending(false);
    } catch (error) {
      console.error('Error from add liquidity base asset approval', error);
    } finally {
      setIsBaseAssetApproving(false);
    }
  };

  const getAvailableTermAssetBalance = () => {
    if (active) {
      return intlFormatNumber(
        bnum(ethers.utils.formatUnits(termAssetBalance, underlyingDecimals)).dp(2, 1).toString(),
        2
      );
    } else {
      return 'No wallet connected';
    }
  };

  const getAvailableBaseAssetBalance = () => {
    if (active) {
      return intlFormatNumber(
        bnum(ethers.utils.formatUnits(baseAssetBalance, underlyingDecimals)).dp(2, 1).toString(),
        2
      );
    } else {
      return 'No wallet connected';
    }
  };

  const getSubmitBtnText = () => {
    if (!active) {
      return 'Connect wallet to Add';
    }
    if (txPending) {
      return <Loader size={3} color="inherit" />;
    }
    if (baseAssetAmountError || termAssetAmountError) {
      return 'Insufficient Balance';
    } else {
      return 'Add';
    }
  };

  const isSubmitBtnDisabled = () => {
    if (active) {
      return (
        baseAssetAmountError ||
        termAssetAmountError ||
        baseAssetAmount === '' ||
        parseFloat(baseAssetAmount) === 0 ||
        termAssetAmount === '' ||
        parseFloat(termAssetAmount) === 0 ||
        termAssetApprovalPending ||
        baseAssetApprovalPending ||
        txPending ||
        network !== SUPPORTED_NETWORK
      );
    }
  };

  const showLoading = useMemo(() => active && network === SUPPORTED_NETWORK && loading, [active, network, loading]);

  return (
    <>
      <Grid py={3} item container>
        <MaxInput
          id="term-asset-amount"
          primaryText={showLoading ? <SkeletonLoader width="80%" /> : `Add ${termAssetSymbol}`}
          secondaryText={showLoading ? <SkeletonLoader width="60%" /> : `Balance: ${getAvailableTermAssetBalance()}`}
          value={termAssetAmount}
          disabled={showLoading}
          error={termAssetAmountError}
          errorMessage={termAssetAmountError ? `Not enough ${termAssetSymbol} or invalid amount` : ''}
          placeholder="Term Asset"
          handleInput={handleTermAssetInput}
          handleClickMaxBtn={handleClickTermAssetMaxBtn}
        />
      </Grid>

      <Grid py={1.5} item container>
        <MaxInput
          id="base-asset-amount"
          primaryText={showLoading ? <SkeletonLoader width="80%" /> : `Add ${baseAssetSymbol}`}
          secondaryText={showLoading ? <SkeletonLoader width="60%" /> : `Balance: ${getAvailableBaseAssetBalance()}`}
          value={baseAssetAmount}
          disabled={showLoading}
          error={baseAssetAmountError}
          errorMessage={baseAssetAmountError ? `Not enough ${baseAssetSymbol} or invalid amount` : ''}
          placeholder="Base Asset"
          handleInput={handleBaseAssetInput}
          handleClickMaxBtn={handleClickBaseAssetMaxBtn}
        />
      </Grid>

      <Grid py={termAssetApprovalPending ? 1.5 : 0} item>
        <ApprovalCard
          approvalPending={termAssetApprovalPending}
          approvalMessage={termAssetApprovalMessage}
          handleApprove={handleTermAssetApprove}
          loading={isTermAssetApproving}
        />
      </Grid>

      <Grid py={baseAssetApprovalPending ? 1.5 : 0} item>
        <ApprovalCard
          approvalPending={baseAssetApprovalPending}
          approvalMessage={baseAssetApprovalMessage}
          handleApprove={handleBaseAssetApprove}
          loading={isBaseAssetApproving}
        />
      </Grid>

      <Grid pt={1.5} item width="100%">
        <Button
          variant={active && (baseAssetAmountError || termAssetAmountError) ? 'outlined' : 'contained'}
          color={active ? 'primary' : 'error'}
          disabled={isSubmitBtnDisabled()}
          sx={{
            padding: theme.typography.pxToRem(18),
            ...(active &&
              (baseAssetAmountError || termAssetAmountError) && {
                backgroundColor: '#00000000 !important',
                border: '1px solid #d32f2f80 !important',
                color: '#d32f2f !important',
                '&:hover': {
                  backgroundColor: '#d32f2f0a !important',
                  border: '1px solid #d32f2f !important'
                }
              })
          }}
          onClick={active ? handleSubmit : handleConnect}
          fullWidth
        >
          {getSubmitBtnText()}
        </Button>
      </Grid>
    </>
  );
}
