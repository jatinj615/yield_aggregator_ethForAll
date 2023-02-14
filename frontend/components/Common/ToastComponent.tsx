/**
 * common snackbar component to show alerts -> info, warn, etc.
 *
 * This is a class based component as all components should be class based only
 */

import toast, { Toast, Toaster } from 'react-hot-toast';
import { Alert, AlertColor, AlertTitle, Button, CircularProgress, Grid, LinearProgress, Stack } from '@mui/material';
import * as React from 'react';
import { ToastContext, ToastDataInterface } from 'context/toastContext';
import { isEmpty, some } from 'lodash-es';

const openLink = (link: string | undefined, linkType: string): void => {
  if (!isEmpty(link) && linkType === 'EXTERNAL') {
    window.open(link);
  } else if (!isEmpty(link) && linkType === 'INTERNAL') {
    window.location.href = link;
  }
};

const handleDismissToast = (id: string, timeoutID, interval) => {
  toast.dismiss(id);
  if (timeoutID) {
    clearTimeout(timeoutID);
    clearInterval(interval);
  }
};

interface IState {
  countdown: number;
}

export default class ToastComponent extends React.Component<{}> {
  static contextType = ToastContext;
  interval: any;

  constructor(props: any) {
    super(props);
  }

  state: IState = {
    countdown: 100
  };

  componentDidMount(): void {
    this.interval = this.runCountdown();
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  runCountdown = () => {
    return setInterval(() => {
      this.setState((prevState: IState) => ({ countdown: prevState.countdown - 1 }));
    }, 45);
  };

  getSeverity = (type: string, severity: ToastDataInterface['severity']): AlertColor => {
    // ? if the type is being passed and is of certain types then use that
    if (some(['success', 'error'], (alertColor: string) => alertColor === type)) {
      return type as AlertColor;
    }

    // ? exception for loading
    if (severity !== 'loading') {
      return severity as AlertColor;
    }

    return 'info';
  };

  handleClickPrimary = (currentToastData: ToastDataInterface, id: string) => {
    if (currentToastData?.primaryButtonType === 'ANCHOR') {
      openLink(currentToastData?.link, currentToastData?.linkType);
    } else if (currentToastData?.primaryButtonType === 'BUTTON' && currentToastData?.buttonActionType === 'DISMISS') {
      handleDismissToast(id, currentToastData?.timeoutID, this.interval);
    }
  };

  handleClickSecondary = (currentToastData: ToastDataInterface, id: string) => {
    if (currentToastData?.secondaryButtonType === 'ANCHOR') {
      openLink(currentToastData?.link, currentToastData?.linkType);
    } else if (currentToastData?.secondaryButtonType === 'BUTTON' && currentToastData?.buttonActionType === 'DISMISS') {
      handleDismissToast(id, currentToastData?.timeoutID, this.interval);
    }
  };

  render() {
    const toastdata = this.context.toastdata;

    return (
      <Toaster
        position="bottom-right"
        toastOptions={{
          success: {
            duration: 6000
          },
          error: {
            duration: 6000
          },
          blank: {
            duration: 6000
          },
          loading: {
            icon: <CircularProgress size={20} />
          }
        }}
      >
        {({ message, id, type, icon }: Toast) => {
          const currentToastData: ToastDataInterface = toastdata?.[id];

          // ? for loading use the theme color over alert severity
          const restProps = type === 'loading' ? { color: 'primary' as AlertColor } : {};

          return (
            <Grid sx={{ width: 'unset', position: 'relative' }} container direction="column" alignItems="center">
              <Alert
                severity={this.getSeverity(type, currentToastData?.severity)}
                action={
                  <Stack direction="row" sx={{ mt: currentToastData?.title ? 3 : 0 }}>
                    {/*  anchors with external links */}
                    {currentToastData?.primaryButtonType && (
                      <Button
                        sx={{ ml: 1 }}
                        name="primary"
                        color="inherit"
                        size="small"
                        onClick={() => this.handleClickPrimary(currentToastData, id)}
                      >
                        {currentToastData?.primaryButtonText}
                      </Button>
                    )}
                    {/* buttons with dismiss action */}
                    {currentToastData?.secondaryButtonType && (
                      <Button
                        name="secondary"
                        color="inherit"
                        size="small"
                        onClick={() => this.handleClickSecondary(currentToastData, id)}
                      >
                        {currentToastData?.secondaryButtonText || 'DISMISS'}
                      </Button>
                    )}
                  </Stack>
                }
                icon={icon}
                {...restProps}
              >
                {/* to add a title pass it */}
                {currentToastData?.title && <AlertTitle>{currentToastData.title}</AlertTitle>}
                {message}
              </Alert>
              {currentToastData?.timeoutID && (
                <LinearProgress
                  sx={{ width: '100%', position: 'absolute', bottom: 0.2, borderRadius: '0 0 4px 4px' }}
                  variant="determinate"
                  value={this.state.countdown}
                />
              )}
            </Grid>
          );
        }}
      </Toaster>
    );
  }
}
