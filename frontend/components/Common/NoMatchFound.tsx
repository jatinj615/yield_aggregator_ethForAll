import { Button, Grid, Theme, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import PortfolioNoResultsLight from 'assets/svg/portfolio-no-results-light.svg';
import PortfolioNoResultsDark from 'assets/svg/portfolio-no-results-dark.svg';

export default function NoMatchFound() {
  const theme: Theme = useTheme();
  const router: NextRouter = useRouter();

  const handleClickDeposit = () => {
    router.push('/');
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      mx="auto"
      mt={5}
      rowSpacing={4}
      sx={{ width: '100%', maxWidth: '30%', minWidth: theme.typography.pxToRem(350) }}
    >
      <Grid item>
        {theme.palette.mode === 'light' ? (
          <Image src={PortfolioNoResultsLight} alt="portfolio no results in light theme" />
        ) : (
          <Image src={PortfolioNoResultsDark} alt="portfolio no results in dark theme" />
        )}
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">Please connect your wallet to view your portfolio</Typography>
      </Grid>
      <Grid item width={theme.typography.pxToRem(350)}>
        <Button
          variant="contained"
          color="error"
          sx={{
            padding: theme.typography.pxToRem(18),
            width: '100%'
          }}
          onClick={handleClickDeposit}
        >
          Go to Deposit
        </Button>
      </Grid>
    </Grid>
  );
}
