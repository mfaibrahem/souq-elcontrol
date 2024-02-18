import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import getMyOrdersApi from '../apis/orders-apis/getMyOrdersApi';
import UserContext from '../contexts/user-context/UserProvider';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useMyOrders = () => {
  const { i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [fetchOrdersCount, setFetchOrdersCount] = useState(0);
  const [allFetchedOrders, setAllFetchedOrders] = useState();
  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingOrders(true);
      customApiRequest(
        getMyOrdersApi(user?.token, i18n.language),
        (res) => {
          setIsLoadingOrders(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedOrders(res.data.data);
          }
        },
        (error) => {
          setIsLoadingOrders(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchOrdersCount]);

  return {
    isLoadingOrders,
    setIsLoadingOrders,
    //
    fetchOrdersCount,
    setFetchOrdersCount,
    //
    allFetchedOrders,
    setAllFetchedOrders
  };
};

export default useMyOrders;
