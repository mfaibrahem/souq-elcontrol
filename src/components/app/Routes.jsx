import React, { lazy, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ForgetPasswordProvider } from '../../contexts/forget-password-context/ForgetPasswordContext';
import UserContext from '../../contexts/user-context/UserProvider';
import AboutUsPage from '../../pages/aboutus-page/AboutUsPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import SigninPage from '../../pages/signin-page/SigninPage';
import SignupPage from '../../pages/signup-page/SignupPage';
import StartSellingPage from '../../pages/start-selling-page/StartSellingPage';
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
        {!loggedIn ? <SignupPage /> : <Redirect to={routerLinks.notFound} />}
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

      {ServicesRoutes()}

      <Route exact path={routerLinks?.startSellingRoute}>
        <StartSellingPage />
      </Route>
      <Route exact path={routerLinks?.aboutUsRoute}>
        <AboutUsPage />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
