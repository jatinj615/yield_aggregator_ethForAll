import { useEffect } from 'react';
import { Alert, Box, darken, lighten, Link as MUILink, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

import { useStoreActions, useStoreState } from 'store/globalStore';
import { getItem, setItem } from 'utils';

export const bannerHeight: number = 40;

export default function Banner() {
  const theme = useTheme();
  const { showContractBanner } = useStoreState((state) => state);
  const { setShowContractBanner } = useStoreActions((action) => action);

  useEffect(() => {
    setShowContractBanner(!getItem('hideContractBanner'));
  }, []);

  const handleCloseContractBanner = () => {
    setItem('hideContractBanner', true);
    setShowContractBanner(false);
  };

  if (showContractBanner) {
    return (
      <Alert
        sx={{
          borderRadius: 0,
          background: `linear-gradient(${theme.palette.primary.main}, ${
            theme.palette.mode === 'light'
              ? darken(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.1)
          })`,
          color: '#FFFFEB',
          '& .MuiAlert-icon, & .MuiAlert-message, & .MuiAlert-action': {
            display: 'flex',
            alignItems: 'center'
          },
          [theme.breakpoints.up('md')]: {
            height: `${bannerHeight}px`
          }
        }}
        variant="filled"
        severity="info"
        onClose={handleCloseContractBanner}
      >
        <Typography variant="body2" component="div">
          {'Unreal Finance contracts have been successfully audited by Certik! '}
          <Link href="https://unreal.finance/docs/reports/unreal_finance_audit_report_131022.pdf" passHref>
            <MUILink color="inherit" underline="hover" rel="noopener noreferrer" target="_blank">
              <Box fontWeight="fontWeightBold" display="inline">
                Read the report here.
              </Box>
            </MUILink>
          </Link>
        </Typography>
      </Alert>
    );
  }

  return null;
}
