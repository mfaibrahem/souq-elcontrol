import { store } from 'react-notifications-component';

const successNotification = ({ title, message }) => {
  return store.addNotification({
    title,
    message,
    type: 'success',
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

export default successNotification;
