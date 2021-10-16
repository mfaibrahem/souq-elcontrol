import { Redirect, Route } from 'react-router-dom';
import routerLinks from '../components/app/routerLinks';
const protectMe = (path, component, key, redirectRoute, loggedIn) => {
  return (
    <Route exact path={path} key={key}>
      {loggedIn ? (
        component
      ) : (
        <Redirect to={redirectRoute ? redirectRoute : routerLinks.signinPage} />
      )}
    </Route>
  );
};

export default protectMe;
