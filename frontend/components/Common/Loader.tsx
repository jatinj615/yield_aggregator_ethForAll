import { CircularProgress, CircularProgressProps, Grid, Theme, useTheme } from '@mui/material';

interface ILoaderProps {
  size?: number;
  color?: CircularProgressProps['color'];
}

export default function Loader({ size = 5, color = 'primary' }: ILoaderProps) {
  const theme: Theme = useTheme();

  const sizeInPixels = theme.spacing(size);
  return (
    <Grid container item xs alignItems="center" justifyContent="center">
      <CircularProgress color={color} size={sizeInPixels} />
    </Grid>
  );
}
