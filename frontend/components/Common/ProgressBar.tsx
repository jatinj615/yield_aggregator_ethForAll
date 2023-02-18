import { LinearProgress, linearProgressClasses, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

const ProgressBar = styled(LinearProgress)(({ theme }: { theme: Theme }) => ({
  height: theme.typography.pxToRem(10),
  borderRadius: theme.typography.pxToRem(5),
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}));

export default ProgressBar;
