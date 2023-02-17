import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { debounce } from 'lodash-es';

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  Typography,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import MaxInput from 'components/Common/Maxinput';
import ApprovalCard from 'components/Common/ApprovalCard';
import Loader from 'components/Common/Loader';
import SkeletonLoader from 'components/Common/SkeletonLoader';
import useRegistry from 'hooks/useRegistry';
import { useStoreActions } from 'store/globalStore';
import useERC20 from 'hooks/useERC20';
import { useNetwork } from 'hooks/ethereum';
import { formatNumber, intlFormatNumber, isIncorrectNumberFormat } from 'utils';
import { constantStrings } from 'utils/constants';
import { bnum, ZERO } from 'utils/poolCalc/utils/bignumber';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { SUPPORTED_NETWORKS } from 'constants/networkNames';
import { getCurrencyPath } from 'constants/currencyPaths';
import { ToastContext } from 'context/toastContext';
import { ConnextWeth, registries } from '../../utils/multiChainConstants';

interface IDepositCardModalProps {
  showDialog: boolean;
  setShowDialog: Function;
  underlyingTokenSymbol: string;
  aToken:string;
  chainId: number;
  chainName: string;
  vaultAddress: string;
  underlying: string;
  underlyingDecimals: number;
}

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, px: 6, pt: 5, pb: 0 }} {...other}>
      <Grid container justifyContent="flex-end">
        {children}
        {onClose ? (
          <Grid item>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                marginRight: -1,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        ) : null}
      </Grid>
    </DialogTitle>
  );
};

const valueText = (value: number): string => {
  return `${value} %`;
};

const marks = [
  {
    value: 0,
    label: '0%'
  },
  {
    value: 25,
    label: '25%'
  },
  {
    value: 50,
    label: '50%'
  },
  {
    value: 75,
    label: '75%'
  },
  {
    value: 100,
    label: '100%'
  }
];

export default function DepositCardModal({
  showDialog,
  setShowDialog,
  underlyingTokenSymbol,
  aToken,
  chainId,
  chainName,
  vaultAddress,
  underlying,
  underlyingDecimals
}: IDepositCardModalProps) {
  
  const { setShouldUpdateDepositCard } = useStoreActions((action) => action);
  const { setShowConnectWalletModal } = useContext(ToastContext);
  const {
    activate: activateActiveConnector,
    deactivate: deactivateActiveConnector,
    active,
    library
  } = useWeb3React<Web3Provider>();
  const network = useNetwork(library);
  const connectedChainId = library._network.chainId
  underlying = ConnextWeth[connectedChainId]
  const erc20 = useERC20();
  const underlyingToken = useMemo(() => erc20(underlying), [erc20, underlying]);
  const {userDepositRequest, getRegistryContract} = useRegistry()
  const [amountError, setAmountError] = useState<boolean>(false);
  const [txPending, setTxPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [approvalPending, setApprovalPending] = useState<boolean>(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [approvedLimit, setApprovedLimit] = useState<ethers.BigNumber>(ethers.constants.MaxUint256);
  const [balance, setBalance] = useState<ethers.BigNumber>(ethers.BigNumber.from('0'));
  const [underlyingSymbol, setUnderlyingSymbol] = useState<string>(underlyingTokenSymbol ? underlyingTokenSymbol : '-');
  const [amount, setAmount] = useState<string>('0');
  const [amountPercentage, setAmountPercentage] = useState<number>(0);
  const theme = useTheme();

  const hideDialog = () => {
    setShowDialog(false);
  };

  const approvalMessage = useMemo(
    () => `You need to grant approval to spend your ${underlyingSymbol} in order to perform this transaction.`,
    [underlyingSymbol]
  );

  const handleConnect = () => {
    setShowConnectWalletModal(true);
  };

  const handleSubmit = async () => {
    setTxPending(true);

    try {
      const amountToSubscribe = ethers.utils.parseUnits(amount, underlyingDecimals);

      if (approvedLimit.gte(amountToSubscribe)) {
        // TODO: add registry deposit tx
<<<<<<< Updated upstream
        await userDepositRequest(chainId, ethers.BigNumber.from('30'), underlying, amountToSubscribe, vaultAddress, ethers.BigNumber.from('5'))
=======
        await userDepositRequest(chainId, ethers.BigNumber.from('30'), underlying, amountToSubscribe, vaultAddress, ethers.BigNumber.from('2'))
>>>>>>> Stashed changes
        

        setAmount('');
        setAmountPercentage(0);
        setShouldUpdateDepositCard({ shouldUpdate: true, underlyingAddress: underlying });
        const balance = await underlyingToken.getBalance();
        setBalance(balance);
        const limit = await underlyingToken.getAllowance(registries[library._network.chainId]);
        setApprovedLimit(limit);
        setShowDialog(false);
      } else {
        setApprovalPending(true);
      }
    } finally {
      setTxPending(false);
    }
  };

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const balanceFormatted = bnum(ethers.utils.formatUnits(balance, underlyingDecimals));
      const newValue = balanceFormatted.gt(ZERO)
        ? bnum(e.target.value).multipliedBy(100).div(balanceFormatted).toNumber()
        : 0;
      setAmount(e.target.value);
      setAmountPercentage(newValue);
      // setotytAmountLoading(true);
      if (isIncorrectNumberFormat(e.target.value)) {
        setAmountError(true);
        // getOTYTCountDebounced.cancel();
        // setotytAmountLoading(false);
      } else {
        const newB = parseFloat(ethers.utils.formatUnits(balance, underlyingDecimals));
        const newI = parseFloat(e.target.value);
        if (newI > newB) {
          setAmountError(true);
          // getOTYTCountDebounced.cancel();
          // setotAmount('');
          // setytAmount('');
          // setotytAmountLoading(false);
        } else {
          setAmountError(false);
          // getOTYTCountDebounced.cancel();
          // await getOTYTCountDebounced(getOTYTCount, ethers.utils.parseEther(e.target.value));
        }
      }
    } else {
      setAmount('');
      setAmountPercentage(0);
      setAmountError(false);
      // getOTYTCountDebounced.cancel();
      // setotytAmountLoading(false);
    }
  };

  const handleClickMaxBtn = async () => {
    const balanceFormatted = bnum(ethers.utils.formatUnits(balance, underlyingDecimals));
    const maxAmount = formatNumber(balanceFormatted.dp(6, 1).toString(), 6);
    setAmount(maxAmount);
    setAmountPercentage(balanceFormatted.gt(ZERO) ? 100 : 0);
    setAmountError(false);
    // setotytAmountLoading(true);
    // getOTYTCountDebounced.cancel();
    // await getOTYTCountDebounced(getOTYTCount, ethers.utils.parseEther(maxAmount));
  };

  const handleApprove = async () => {
    setIsApproving(true);

    try {
      const tx = await underlyingToken.approve(ethers.constants.MaxUint256, registries[library._network.chainId]);

      await toast.promise(tx.wait(), {
        loading: constantStrings.approvalPending,
        success: constantStrings.approvalCompleted,
        error: constantStrings.approvalFailed
      });

      const limit = await underlyingToken.getAllowance(registries[library._network.chainId]);
      setApprovedLimit(limit);
      setApprovalPending(false);
    } catch (error) {
      console.error('Error from deposit card approval', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleSliderChange = async (event: Event, newValue: number | number[]) => {
    const balanceFormatted = bnum(ethers.utils.formatUnits(balance, underlyingDecimals));
    const amount = formatNumber(
      balanceFormatted
        .multipliedBy(newValue as number)
        .div(100)
        .dp(6, 1)
        .toString(),
      6
    );
    setAmountPercentage(newValue as number);
    setAmount(amount);
    setAmountError(false);
    // setotytAmountLoading(true);
    // getOTYTCountDebounced.cancel();
    // await getOTYTCountDebounced(getOTYTCount, ethers.utils.parseEther(amount));
  };

  // useEffect(() => {
  //   // Clean the state when the component is unmounted
  //   return () => {
  //     getOTYTCountDebounced.cancel();
  //   };
  // }, [getOTYTCountDebounced]);

  useEffect(() => {
    const fetch = async () => {
      if (underlyingToken?.approve && loading) {
        try {
          const symbol = await underlyingToken.symbol();
          setUnderlyingSymbol(symbol);

          const balance = await underlyingToken.getBalance();
          setBalance(balance);
          const limit = await underlyingToken.getAllowance(registries[library._network.chainId]);
          setApprovedLimit(limit);
        } catch (error) {
          console.error('Error from deposit card modal ERC20 API', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetch();
  }, [underlyingToken, loading]);

  const getAvailableBalance = () => {
    
    if (!active) {
      return 'No wallet connected';
    }
    if (loading) {
      return (
        <Grid container item wrap="nowrap" columnGap={1}>
          <SkeletonLoader width={50} /> {underlyingSymbol}
        </Grid>
      );
    } else {
      return `${intlFormatNumber(
        bnum(ethers.utils.formatUnits(balance, underlyingDecimals)).dp(4).toString(),
        4
      )} ${underlyingSymbol}`;
    }
  };

  const getSubmitBtnText = () => {
    if (!active) {
      return 'Connect wallet to deposit';
    }
    if (txPending) {
      return <Loader size={3} color="inherit" />;
    }
    if (amountError) {
      return 'Insufficient Balance';
    } else {
      return `Deposit ${underlyingSymbol}`;
    }
  };

  const isSubmitBtnDisabled = () => {
    if (active) {
      return (
        amountError ||
        amount === '' ||
        parseFloat(amount) === 0 ||
        approvalPending ||
        txPending 
      );
    }
  };

  const isSliderDisabled = () => {
    return (
      bnum(ethers.utils.formatUnits(balance, underlyingDecimals)).lte(ZERO) ||
      !(active) ||
      loading
    );
  };

  return (
    <Dialog
      open={showDialog}
      onClose={hideDialog}
      sx={{
        '& .MuiDialog-paper': {
          background: theme.unreal.modal.backgroundColor,
          borderRadius: theme.typography.pxToRem(16)
        }
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={hideDialog}></BootstrapDialogTitle>
      <DialogContent sx={{ p: 6 }}>
        <Grid py={4} container alignItems="center" justifyContent="space-between">
          <Grid item xs={6} container direction="column">
            <Grid item>
              <Typography variant="caption" display="block" gutterBottom>
                Mint ownership and yield tokens using
              </Typography>
            </Grid>
            <Grid container spacing={1.5} item alignItems="center">
              <Grid item>
                <Avatar alt="Currency Logo" src='./png/currencies/ethereum-eth-logo.png' sx={{ width: 28, height: 28 }} />
              </Grid>
              <Grid item>
                <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>{underlyingSymbol}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} container direction="column" alignItems="flex-end">
            <Grid item>
              <Typography variant="caption" display="block">
                Available Balance
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontWeight="bold" component="div">
                {getAvailableBalance()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <MaxInput
          id="deposit-amount"
          value={amount}
          disabled={!active || loading}
          error={amountError}
          errorMessage={`Not enough ${underlyingSymbol} or invalid amount`}
          placeholder="Enter amount"
          handleInput={handleInput}
          handleClickMaxBtn={handleClickMaxBtn}
          customStyles={{ bgcolor: theme.palette.background.default }}
        />
        <Slider
          size="small"
          aria-label="Amount Quick Slider"
          value={amountPercentage}
          getAriaValueText={valueText}
          step={25}
          marks={marks}
          min={0}
          max={100}
          disabled={isSliderDisabled()}
          onChange={handleSliderChange}
          sx={{
            mt: 2
          }}
        />
        <ApprovalCard
          approvalPending={approvalPending}
          approvalMessage={approvalMessage}
          handleApprove={handleApprove}
          loading={isApproving}
          customStyles={approvalPending ? { mt: 4 } : {}}
        />
        {/* <Typography sx={{ mt: 4, mb: 2 }} variant="subtitle2" gutterBottom component="div">
          {`Here's what you'll get`}
        </Typography> */}
        {/* <Typography variant="h6" component="div">
          {otytAmountLoading ? (
            <Grid container item wrap="nowrap" columnGap={1}>
              <SkeletonLoader width={85} /> {otSymbol}
            </Grid>
          ) : (
            `${otAmount ? otAmount : '-'} ${otSymbol}`
          )}
        </Typography> */}
        {/* <Typography variant="caption" display="block" gutterBottom>
          OWNERSHIP TOKENS
        </Typography> */}
        {/* <Typography variant="h6" component="div">
          {otytAmountLoading ? (
            <Grid container item wrap="nowrap" columnGap={1}>
              <SkeletonLoader width={85} /> {ytSymbol}
            </Grid>
          ) : (
            `${ytAmount ? ytAmount : '-'} ${ytSymbol}`
          )}
        </Typography> */}
        {/* <Typography variant="caption" display="block" gutterBottom>
          YIELD TOKENS
        </Typography> */}
        {/* <Typography sx={{ mt: 4 }} variant="caption" display="block" gutterBottom>
            You can use the principal and yield tokens to achieve lorem ipsum dolor sit amet and I’m typing some more
            text here to fill some empty space. That is it, no more text now. Learn More
          </Typography> */}
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: theme.unreal.modal.buttonContainerBackgroundColor,
          height: theme.typography.pxToRem(100),
          padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
          justifyContent: 'space-between'
        }}
      >
        <Grid item xs={3}>
          <Button
            onClick={hideDialog}
            sx={{
              padding: theme.typography.pxToRem(18)
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button
            variant="contained"
            color={active ? 'primary' : 'error'}
            disabled={isSubmitBtnDisabled()}
            onClick={active ? handleSubmit : handleConnect}
            sx={{
              padding: theme.typography.pxToRem(18)
            }}
            fullWidth
          >
            {getSubmitBtnText()}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
