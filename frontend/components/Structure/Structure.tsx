import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  Avatar,
  Button,
  Chip,
  CssBaseline,
  GlobalStyles,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tooltip,
  useTheme
} from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ToastContext } from 'context/toastContext';
import { useEagerConnect, useFormattedWalletAddress, useInactiveListener, useNetwork, useSigner } from 'hooks/ethereum';
import makeBlockie from 'ethereum-blockies-base64';
import Container from 'components/Common/Container';
import SkeletonLoader from 'components/Common/SkeletonLoader';
// import { TopbarItems } from 'constants/TopbarConstants';
import BackgroundIcon from 'assets/svg/background-icon.svg';
import { useRouter } from 'next/router';
import { Circle as CircleIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { useStoreActions, useStoreState } from 'store/globalStore';
import { ethers } from 'ethers';
import { NetworkName } from 'enums';
import { SUPPORTED_NETWORK } from 'constants/networkNames';
import { setItem, intlFormatNumber } from 'utils';

const PageBackgroundIconWrapperComponent = styled('div')({
  position: 'fixed',
  bottom: '-35vh',
  left: '-10vw',
  zIndex: -1,
  overflow: 'hidden',
  height: '100vh',
  width: '50vw'
});

export default function Structure({ children }: any) {
  const theme = useTheme();
  const router = useRouter();
  const setTheme = useStoreActions((actions) => actions.setTheme);
  const {
    shouldUpdate,
    shouldUpdateDepositCard,
    showContractBanner,
    theme: themeSelected
  } = useStoreState((state) => state);
  const { account, active, library } = useWeb3React<Web3Provider>();
  const formattedAddress = useFormattedWalletAddress(account, library);
  const network = useNetwork(library);
  const signer = useSigner(account, library);
  const { setShowConnectWalletModal } = React.useContext(ToastContext);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [ethBalance, setEthBalance] = React.useState<ethers.BigNumber>(ethers.constants.Zero);
  const [loading, setLoading] = React.useState<boolean>(true);

  const open = Boolean(anchorEl);

  const blockieSrc = React.useMemo(() => (active ? account : 'Yielder'), [active, account]);
  const mainPageHeight = `calc(100vh - ${showContractBanner ? bannerHeight : 0}px)`;

  React.useEffect(() => {
    let active = true;

    const setBalance = async () => {
      if (signer || shouldUpdate || shouldUpdateDepositCard?.shouldUpdate) {
        try {
          const balance = await signer.getBalance();
          if (!active) {
            return;
          }
          setEthBalance(balance);
        } catch (error) {
          console.error('Error from structure signer getBalance API', error);
        } finally {
          setLoading(false);
        }
      }
    };

    setBalance();
    // Clean the state when the component is unmounted
    return () => {
      active = false;
      setEthBalance(ethers.constants.Zero);
      setLoading(true);
    };
  }, [signer, shouldUpdate, shouldUpdateDepositCard]);

  // React.useEffect(() => {
  //   const { title: titleFound = '', subtitle: subtitleFound = '' } =
  //     find(TopbarItems, ({ link }) => router.pathname === link) ?? {};
  //   setTitle(titleFound);
  //   setSubtitle(subtitleFound);
  // }, [router.pathname]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConnect = () => {
    setShowConnectWalletModal(true);
  };

  const handleClickLightTheme = () => {
    setItem('theme', 'light');
    setTheme('light');
  };

  const handleClickDarkTheme = () => {
    setItem('theme', 'dark');
    setTheme('dark');
  };

  return (
    <>
      {/* override the global css */}
      <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default } }} />

      {/* color scheme for theme modes */}
      {/* https://mui.com/components/css-baseline/#color-scheme */}
      <CssBaseline enableColorScheme />

      {/* background image */}
      <PageBackgroundIconWrapperComponent>
        <Image src={BackgroundIcon} alt="background icon" />
      </PageBackgroundIconWrapperComponent>

      {/* main page content */}
      <Grid
        sx={{
          height: mainPageHeight,
          '& .MuiGrid-root.MuiGrid-item': {
            '&.MuiGrid-item--navbar,&.MuiGrid-item--container': {
              width: '100%',
              maxWidth: '90%',
              minWidth: '300px'
            }
          }
        }}
        container
        pt={1}
        direction="column"
        wrap="nowrap"
      >
        <Grid className="MuiGrid-item--navbar" container item alignItems="center" mx="auto">
          <Grid item xs>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              {active ? (
                <>
                  <Chip
                    sx={{ borderRadius: theme.typography.pxToRem(5) }}
                    label={network && network === NetworkName.MAINNET ? 'mainnet' : network || NetworkName.GOERLI}
                    variant="outlined"
                    color={network && network !== SUPPORTED_NETWORK ? 'error' : 'default'}
                  />
                  <Tooltip title="Wallet Connection Settings">
                    <Chip
                      sx={{ borderRadius: theme.typography.pxToRem(5) }}
                      label={formattedAddress}
                      variant="outlined"
                      icon={
                        <CircleIcon
                          sx={{
                            '&.MuiChip-icon': {
                              color:
                                network && network !== SUPPORTED_NETWORK
                                  ? theme.palette.error.light
                                  : theme.palette.success.light,
                              fontSize: '0.6rem'
                            }
                          }}
                        />
                      }
                      onClick={handleConnect}
                    />
                  </Tooltip>
                  <Chip
                    sx={{ borderRadius: theme.typography.pxToRem(5) }}
                    label={
                      loading ? (
                        <Grid container item wrap="nowrap" columnGap={1}>
                          <SkeletonLoader width={40} /> ETH
                        </Grid>
                      ) : (
                        `${intlFormatNumber(ethers.utils.formatEther(ethBalance), 4)} ETH`
                      )
                    }
                    variant="outlined"
                  />
                </>
              ) : (
                <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={handleConnect}>
                  Connect to wallet
                </Button>
              )}
              {/* User account dropdown */}
              <Tooltip title="Account Settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar alt="Ethereum Blockie" src={makeBlockie(blockieSrc)} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0
                    }
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClickLightTheme} selected={themeSelected.mode === 'light'}>
                  <LightModeIcon sx={{ marginRight: 1 }} /> Light Theme
                </MenuItem>
                <MenuItem onClick={handleClickDarkTheme} selected={themeSelected.mode === 'dark'}>
                  <DarkModeIcon sx={{ marginRight: 1 }} /> Dark Theme
                </MenuItem>
              </Menu>
            </Stack>
          </Grid>
        </Grid>
        <Container>{children}</Container>
      </Grid>
    </>
  );
}
