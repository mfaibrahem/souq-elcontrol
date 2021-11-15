/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import cancelOrderApi from '../apis/orders-apis/cancelOrder';
import UserContext from '../contexts/user-context/UserProvider';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useCancelOrder = (setFetchOrdersCount) => {
  const { i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const customApiRequest = useCustomApiRequest();

  const cancelMe = (values) => {
    setIsCancellingOrder(true);
    customApiRequest(
      cancelOrderApi(values, user?.token, i18n.language),
      (res) => {
        setIsCancellingOrder(false);
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
    cancelMe
  };
};

export default useCancelOrder;
