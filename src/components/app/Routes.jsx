import React, { lazy, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ForgetPasswordProvider } from '../../contexts/forget-password-context/ForgetPasswordContext';
import UserContext from '../../contexts/user-context/UserProvider';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import SigninPage from '../../pages/signin-page/SigninPage';
import SignupPage from '../../pages/signup-page/SignupPage';
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

      {ServicesRoutes()}

      <Route path="*" component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
