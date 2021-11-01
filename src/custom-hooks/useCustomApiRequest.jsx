import { useContext } from 'react';
import UserContext from '../contexts/user-context/UserProvider';
import { useHistory } from 'react-router-dom';
import routerLinks from '../components/app/routerLinks';

const checkRes = (res) => {
  return res?.status === 200 && res?.data?.status === 1;
};

const checkUnAuthenticated = (err) => {
  return err?.response?.status === 401;
};

const useCustomApiRequest = () => {
  const history = useHistory();
  const { removeCurrentUser } = useContext(UserContext);

  const customApiRequest = async (
    req,
    successCallback,
    unAuthCallback,
    errorCallback
  ) => {
    try {
      const res = await req;
      console.log('custom res : ', res);
      if (checkRes(res)) {
        successCallback &&
          typeof successCallback === 'function' &&
          successCallback(res);
      }
    } catch (error) {
      errorCallback &&
        typeof errorCallback === 'function' &&
        errorCallback(error);
      if (checkUnAuthenticated(error)) {
        unAuthCallback &&
          typeof unAuthCallback === 'function' &&
          unAuthCallback();
        removeCurrentUser();
        history.push(routerLinks.signinPage);
      }
    }
  };

  return customApiRequest;
};

export default useCustomApiRequest;
