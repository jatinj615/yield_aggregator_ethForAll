import { AlertColor } from '@mui/material';

export default interface SnackbarEventInterface {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number | null;
}
