import React, { lazy, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ForgetPasswordProvider } from '../../contexts/forget-password-context/ForgetPasswordContext';
import { PostsProvider } from '../../contexts/posts-context/PostsContext';
import { SinglePostProvider } from '../../contexts/single-post-context/SinglePostContext';
import UserContext from '../../contexts/user-context/UserProvider';
import AboutUsPage from '../../pages/aboutus-page/AboutUsPage';
import CarSelectionPage from '../../pages/car-selections-page/CarSelectionPage';
import CarsPage from '../../pages/cars-page/CarsPage';
import CategoriesPage from '../../pages/categories-page/CategoriesPage';
import CitiesPage from '../../pages/cities-page/CitiesPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import PostsPage from '../../pages/post-page/PostsPage';
import SinglePostPage from '../../pages/post-page/SinglePostPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import ServiceCenterDetailsPage from '../../pages/service-center-details-page/ServiceCenterDetailsPage';
import ServiceCenterSignupPage from '../../pages/service-center-signup-page/ServiceCenterSignupPage';
import ServiceCentersPage from '../../pages/service-centers-page/ServiceCentersPage';
import ServiceDetailsPage from '../../pages/service-details-page/ServiceDetailsPage';
import ServicesPage from '../../pages/services-page/ServicesPage';
import SigninPage from '../../pages/signin-page/SigninPage';
import SignupPage from '../../pages/signup-page/SignupPage';
import StartSellingPage from '../../pages/start-selling-page/StartSellingPage';
import SubCategoriesPage from '../../pages/sub-categories-page/SubCategoriesPage';
import protectMe from '../../utils/protectMe';
import routerLinks from './routerLinks';
import ServicesRoutes from './services-routes/ServicesRoutes';
const HomePage = lazy(() => import('../../pages/home-page/HomePage'));

const Routes = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <Switch>
      <Route exact path={routerLinks.homePage}>
        <HomePage />
      </Route>

      <Route exact path={routerLinks.signupPage}>
        {!loggedIn ?
          <ForgetPasswordProvider>
          <SignupPage />
          </ForgetPasswordProvider> : <Redirect to={routerLinks.notFound} />}
      </Route>
      <Route exact path={routerLinks.signinPage}>
        {!loggedIn ? (
          <ForgetPasswordProvider>
            <SigninPage />
          </ForgetPasswordProvider>
        ) : (
          <Redirect to={routerLinks.notFound} />
        )}
      </Route>

      {protectMe(
        routerLinks.profilePage,
        <ProfilePage />,
        987989,
        routerLinks?.signinPage,
        loggedIn
      )}

      <Route exact path={routerLinks.categoriesRoute} key={1}>
        <CategoriesPage />
      </Route>

      <Route exact path={routerLinks.subCategoriesRoute()} key={2}>
        <SubCategoriesPage />
      </Route>
      <Route exact path={routerLinks.postsRoute()} key="posts_route_key">
        <PostsProvider>
          <PostsPage />
        </PostsProvider>
      </Route>
      <Route exact path={routerLinks.singlePost()} key="single_post_route_key">
        <SinglePostProvider>
          <SinglePostPage />
        </SinglePostProvider>
      </Route>
      <Route exact path={routerLinks.cities()} key="cities_route_key">
        <CitiesPage />
      </Route>
      <Route
        exact
        path={routerLinks.serviceCentersRoute()}
        key="service_centers_route_key"
      >
        <ServiceCentersPage />
      </Route>
      <Route
        exact
        path={routerLinks.singleServiceCenter()}
        key="single_service_center_route_key"
      >
        <ServiceCenterDetailsPage />
      </Route>
      <Route
        exact
        path={routerLinks.carSelectionRoute()}
        key="car_selection_key"
      >
        <CarSelectionPage />
      </Route>
      <Route exact path={routerLinks.carsRoute()} key={3}>
        <CarsPage />
      </Route>
      <Route exact path={routerLinks.servicesRoute()} key={4}>
        <ServicesPage />
      </Route>
      <Route exact path={routerLinks.serviceDetailsRoute()} key={5}>
        <ServiceDetailsPage />
      </Route>

      {ServicesRoutes()}

      <Route exact path={routerLinks?.startSellingRoute}>
        <StartSellingPage />
      </Route>
      <Route exact path={routerLinks?.serviceCenterSignupRoute}>
        <ServiceCenterSignupPage />
      </Route>
      <Route exact path={routerLinks?.aboutUsRoute}>
        <AboutUsPage />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
