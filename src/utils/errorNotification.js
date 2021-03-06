import { store } from 'react-notifications-component';

const errorNotification = ({ title, message }) => {
  return store.addNotification({
    title,
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
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
