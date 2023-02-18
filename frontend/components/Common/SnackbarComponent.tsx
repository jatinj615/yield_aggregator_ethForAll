/**
 * common snackbar component to show alerts -> info, warn, etc.
 *
 * This is a class based component as all components should be class based only
 */

import { Alert, AlertColor, Snackbar } from '@mui/material';
import { CustomEventType } from 'enums';
import SnackbarEventInterface from 'interfaces/snackbarEvent.interface';
import * as React from 'react';

interface SnackbarComponentInterface {
  open: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration: number | null;
}

export default class SnackbarComponent extends React.Component<{}, SnackbarComponentInterface> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      message: '',
      severity: 'info',
      autoHideDuration: 6000
    };
  }

  private handleClose = () => {
    this.setState({
      open: false
    });
  };

  // * externally handled function
  public openSnackbar = (event: any) => {
    const {
      detail: { message = '', severity = 'info', autoHideDuration = 6000 }
    }: {
      detail: SnackbarEventInterface;
    } = event;

    this.setState({
      open: true,
      message,
      severity,
      autoHideDuration
    });
  };

  componentDidMount() {
    // Listen for the event.
    document.addEventListener(CustomEventType.SNACKBAR, this.openSnackbar, false);
  }

  // * cleanup event listeners
  componentWillUnmount() {
    document.removeEventListener(CustomEventType.SNACKBAR, this.openSnackbar);
  }

  render() {
    const { open, message, severity, autoHideDuration } = this.state;

    return (
      <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  }
}
