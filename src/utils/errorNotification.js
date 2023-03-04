import { Store } from 'react-notifications-component';

const errorNotification = ({ title, message }) => {
  return Store.addNotification({
    title,
    message,
    type: 'danger',
    insert: 'bottom',
    container: 'bottom-left',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      showIcon: true,
      onScreen: true
    }
  });
};

export default errorNotification;
