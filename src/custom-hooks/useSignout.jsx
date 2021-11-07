import React, { useContext } from 'react';
import UserContext from '../contexts/user-context/UserProvider';
import { useHistory } from 'react-router-dom';
import routerLinks from '../components/app/routerLinks';
import useCustomApiRequest from './useCustomApiRequest';
import checkRes from '../utils/checkRes';
import successNotification from '../utils/successNotification';
import errorNotification from '../utils/errorNotification';
import signoutApi from '../apis/auth/signoutApi';

const useSignout = () => {
  const history = useHistory();
  const { user, removeCurrentUser } = useContext(UserContext);
  const customApiRequest = useCustomApiRequest();
  const [isLoadingSignout, setIsLoadingSignout] = React.useState(false);
  const signMeOut = () => {
    setIsLoadingSignout(true);
    customApiRequest(
      signoutApi(user?.token),
      (res) => {
        setIsLoadingSignout(false);
        if (checkRes) {
          removeCurrentUser();
          successNotification({
            title: 'Operation done successfully',
            message: res?.data?.message || 'تم تسجيل الخروج بنجاح'
          });
          //
          history.push(routerLinks?.signinPage);
        } else {
          errorNotification({
            title: 'حدث خطأ اثناء تسجيل الخروج',
            message: res?.data?.message || 'من فضلك حاول فى وقت لاحق'
          });
        }
      },

      (error) => {
        setIsLoadingSignout(false);
        errorNotification({
          title: 'حدث خطأ اثناء تسجيل الخروج',
          message: error?.response?.data?.message || 'من فضلك حاول وقت لاحق'
        });
      }
    );
  };

  return { signMeOut, isLoadingSignout, setIsLoadingSignout };
};

export default useSignout;
