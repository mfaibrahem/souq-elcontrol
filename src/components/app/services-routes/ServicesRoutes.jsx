import { useContext } from 'react';
import UserContext from '../../../contexts/user-context/UserProvider';
import MakeOrderPage from '../../../pages/make-order-page/MakeOrderPage';
import MyOrdersPage from '../../../pages/my-orders-page/MyOrdersPage';
import protectMe from '../../../utils/protectMe';
import routerLinks from '../routerLinks';

const ServicesRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  return [
    protectMe(
      routerLinks.serviceMakeOrderRoute(),
      <MakeOrderPage />,
      6,
      routerLinks?.signinPage,
      loggedIn
    ),
    protectMe(
      routerLinks.myOrdersRoute,
      <MyOrdersPage />,
      7,
      routerLinks?.signinPage,
      loggedIn
    )
    // <Route exact path={routerLinks.serviceMakeOrderRoute()} key={6}>
    //   <OrdersProvider>
    //     <MakeOrderPage />
    //   </OrdersProvider>
    // </Route>

    // protectMe(
    //   routerLinks.serviceDetailsRoute(),
    //   <ServiceDetailsPage />,
    //   4,
    //   routerLinks.signinPage,
    //   loggedIn
    // )
  ];
};

export default ServicesRoutes;
