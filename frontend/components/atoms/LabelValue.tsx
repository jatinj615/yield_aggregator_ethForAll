import { Grid, Typography, useTheme } from '@mui/material';

export default function LabelValue({ label, value }: any) {
  const theme = useTheme();

  return (
    <Grid sx={{ m: theme.spacing(1) }} item flexDirection="column">
      <Typography sx={{ color: theme.palette.text.secondary, fontSize: theme.spacing(2) }} component="div">
        {label}
      </Typography>{' '}
      <Typography
        sx={{
          color: theme.palette.text.primary,
          fontSize: theme.spacing(2),
          fontWeight: theme.typography.fontWeightBold
        }}
      >
        {value}
      </Typography>
    </Grid>
  );
}
