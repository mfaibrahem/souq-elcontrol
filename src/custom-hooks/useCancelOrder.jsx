import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cancelOrderApi from '../apis/orders-apis/cancelOrder';
import UserContext from '../contexts/user-context/UserProvider';
import useCustomApiRequest from './useCustomApiRequest';

const useCancelOrder = (setFetchOrdersCount) => {
  const { i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const customApiRequest = useCustomApiRequest();

  const cancelMe = (values, setVisible, setSelectedOrderId) => {
    setIsCancellingOrder(true);

    customApiRequest(
      cancelOrderApi(values, user?.token, i18n.language),
      (res) => {
        setIsCancellingOrder(false);
        setVisible(false);
        setSelectedOrderId('');
        if (res?.status === 200) {
          setFetchOrdersCount((prev) => prev + 1);
        }
      },
      (error) => {
        setIsCancellingOrder(false);
      }
    );
  };

  return {
    isCancellingOrder,
    setIsCancellingOrder,
    cancelMe
  };
};

export default useCancelOrder;
