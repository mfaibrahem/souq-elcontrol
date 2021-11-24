import { useContext } from 'react';
import UserContext from '../contexts/user-context/UserProvider';
import { useHistory } from 'react-router-dom';
import routerLinks from '../components/app/routerLinks';

const checkSuccessResponse = (res) => {
  // return res?.status === 200 && res?.data?.status === 1;
  return (
    res?.status === 200
    // res?.status === 200 && res?.data?.status === 1
  );
};

const checkUnAuthenticated = (err) => {
  return err?.response?.status === 401;
};

const useCustomApiRequest = () => {
  const history = useHistory();
  const { removeCurrentUser } = useContext(UserContext);

  const customApiRequest = async (req, successCallback, errorCallback) => {
    try {
      const res = await req;
      // console.log('custom res : ', res);
      if (checkSuccessResponse(res)) {
        successCallback &&
          typeof successCallback === 'function' &&
          successCallback(res);
      }
    } catch (error) {
      if (errorCallback && typeof errorCallback === 'function') {
        if (checkUnAuthenticated(error)) {
          removeCurrentUser();
          history.push(routerLinks.signinPage);
        }
        errorCallback(error);

        // console.log('err : ', error?.response);
        // console.log('err req : ', error?.request);
        // console.log('err config : ', error?.config);
      }
    }
  };

  return customApiRequest;
};

export default useCustomApiRequest;
