import { useContext } from 'react';
import { Route } from 'react-router-dom';
import CarsPage from '../../../pages/cars-page/CarsPage';
import CategoriesPage from '../../../pages/categories-page/CategoriesPage';
import SubCategoriesPage from '../../../pages/sub-categories-page/SubCategoriesPage';
import ServiceDetailsPage from '../../../pages/service-details-page/ServiceDetailsPage';
import ServicesPage from '../../../pages/services-page/ServicesPage';
import routerLinks from '../routerLinks';
import MakeOrderPage from '../../../pages/make-order-page/MakeOrderPage';
import protectMe from '../../../utils/protectMe';
import UserContext from '../../../contexts/user-context/UserProvider';
import MyOrdersPage from '../../../pages/my-orders-page/MyOrdersPage';
import PostsPage from '../../../pages/post-page/PostsPage';
import SinglePostPage from '../../../pages/post-page/SinglePostPage';
import { PostsProvider } from '../../../contexts/posts-context/PostsContext';
import { SinglePostProvider } from '../../../contexts/single-post-context/SinglePostContext';
import CitiesPage from '../../../pages/cities-page/CitiesPage';
import ServiceCentersPage from '../../../pages/service-centers-page/ServiceCentersPage';
import ServiceCenterDetailsPage from '../../../pages/service-center-details-page/ServiceCenterDetailsPage';

const ServicesRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  return [
    <Route exact path={routerLinks.categoriesRoute} key={1}>
      <CategoriesPage />
    </Route>,
    <Route exact path={routerLinks.subCategoriesRoute()} key={2}>
      <SubCategoriesPage />
    </Route>,
    <Route exact path={routerLinks.postsRoute()} key="posts_route_key">
      <PostsProvider>
        <PostsPage />
      </PostsProvider>
    </Route>,
    <Route exact path={routerLinks.singlePost()} key="single_post_route_key">
      <SinglePostProvider>
        <SinglePostPage />
      </SinglePostProvider>
    </Route>,
    <Route exact path={routerLinks.cities()} key="cities_route_key">
      <CitiesPage />
    </Route>,
    <Route
      exact
      path={routerLinks.serviceCentersRoute()}
      key="service_centers_route_key"
    >
      <ServiceCentersPage />
    </Route>,
    <Route
      exact
      path={routerLinks.singleServiceCenter()}
      key="single_service_center_route_key"
    >
      <ServiceCenterDetailsPage />
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
