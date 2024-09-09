import { Notify } from 'quasar';

const NotifyMessage = {
  notifySuccess(message: string) {
    Notify.create({
      type: 'positive',
      position: 'bottom-right',
      classes: 'custom-notify',
      message,
    });
  },
  notifyError(message: string) {
    Notify.create({
      type: 'negative',
      position: 'bottom-right',
      classes: 'custom-notify',
      message,
    });
  },
};

export { NotifyMessage };
