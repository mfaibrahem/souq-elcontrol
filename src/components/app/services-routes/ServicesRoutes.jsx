import { useContext } from 'react';
import { Route } from 'react-router-dom';
import CarsPage from '../../../pages/cars-page/CarsPage';
import CategoriesPage from '../../../pages/categories-page/CategoriesPage';
import SubCategoriesPage from '../../../pages/sub-categories-page/SubCategoriesPage';
import ServiceDetailsPage from '../../../pages/service-details-page/ServiceDetailsPage';
import ServicesPage from '../../../pages/services-page/ServicesPage';
import routerLinks from '../routerLinks';
import MakeOrderPage from '../../../pages/make-order-page/MakeOrderPage';
import { OrdersProvider } from '../../../contexts/orders-context/OrdersContext';
import protectMe from '../../../utils/protectMe';
import UserContext from '../../../contexts/user-context/UserProvider';

const ServicesRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  return [
    <Route exact path={routerLinks.categoriesRoute} key={1}>
      <CategoriesPage />
    </Route>,
    <Route exact path={routerLinks.subCategoriesRoute()} key={2}>
      <SubCategoriesPage />
    </Route>,
    <Route exact path={routerLinks.carsRoute()} key={3}>
      <CarsPage />
    </Route>,
    <Route exact path={routerLinks.servicesRoute()} key={4}>
      <ServicesPage />
    </Route>,
    <Route exact path={routerLinks.serviceDetailsRoute()} key={5}>
      <ServiceDetailsPage />
    </Route>,

    protectMe(
      routerLinks.serviceMakeOrderRoute(),
      <OrdersProvider>
        <MakeOrderPage />
      </OrdersProvider>,
      6,
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
