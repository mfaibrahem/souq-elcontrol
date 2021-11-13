import { useState, createContext } from 'react';

const INITIAL_VALUES = {
  isLoadingOrders: false,
  setIsLoadingOrders: (v) => {},
  fetchCount: 0,
  setFetchCount: (v) => {},
  allFetchedOrders: null,
  setAllFetchedOrders: (v) => {},
  //
  isSubmittingOrder: false,
  setIsSubmittingOrder: (v) => {}
};

const OrdersContext = createContext(INITIAL_VALUES);

export const OrdersProvider = ({ children }) => {
  const [isLoadingOrders, setIsLoadingOrders] = useState(
    INITIAL_VALUES.isLoadingOrders
  );
  const [fetchCount, setFetchCount] = useState(INITIAL_VALUES.fetchCount);
  const [allFetchedOrders, setAllFetchedOrders] = useState(
    INITIAL_VALUES.allFetchedOrders
  );
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(
    INITIAL_VALUES.isSubmittingOrder
  );

  return (
    <OrdersContext.Provider
      value={{
        isLoadingOrders,
        setIsLoadingOrders,
        fetchCount,
        setFetchCount,
        allFetchedOrders,
        setAllFetchedOrders,
        isSubmittingOrder,
        setIsSubmittingOrder
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersContext;
