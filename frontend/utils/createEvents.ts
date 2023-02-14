import { CustomEventType } from 'enums';
import SnackbarEventInterface from 'interfaces/snackbarEvent.interface';

const createSnackbarEvent = ({ message, severity, autoHideDuration }: SnackbarEventInterface) => {
  // * https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
  // Create the event for
  const event = new CustomEvent(CustomEventType.SNACKBAR, {
    detail: {
      message,
      severity,
      autoHideDuration
    }
  });

  // target can be any Element or other EventTarget.
  document.dispatchEvent(event);
};

export { createSnackbarEvent };
