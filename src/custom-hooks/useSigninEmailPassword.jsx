import React, { useContext } from 'react';
import UserContext from '../contexts/user-context/UserProvider';
import { useHistory } from 'react-router-dom';
import routerLinks from '../components/app/routerLinks';
import useCustomApiRequest from './useCustomApiRequest';
import errorNotification from '../utils/errorNotification';
import { useTranslation } from 'react-i18next';
import signinApi from '../apis/auth/signinApi';
import successNotification from '../utils/successNotification';

const useSigninEmailPassword = () => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const { setCurrentUser, setUserToState } = useContext(UserContext);
  const customApiRequest = useCustomApiRequest();
  const [isLoadingSignin, setIsLoadingSignin] = React.useState(false);
  const signMeInWithEmailPassword = (data) => {
    setIsLoadingSignin(true);
    customApiRequest(
      signinApi(data, i18n.language),
      (res) => {
        setIsLoadingSignin(false);
        if (res?.data?.status === 1) {
          setCurrentUser(res.data.data);
          successNotification({
            title: 'العملية تمت بنجاح',
            message: 'تم تسجيل الدخول بنجاح'
          });
          if (data.remember) {
            setCurrentUser({
              ...res?.data?.data
            });
            history.push(routerLinks?.homePage);
          } else {
            setUserToState({ ...res?.data?.data });
            history.push(routerLinks?.homePage);
          }
        } else {
          errorNotification({
            title: 'حدث خطأ',
            message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
          });
        }
      },

      (error) => {
        setIsLoadingSignin(false);
        errorNotification({
          title: 'حدث خطأ اثناء تسجيل الدخول',
          message: error?.response?.data?.message || 'من فضلك حاول وقت لاحق'
        });
      }
    );
  };

  return { signMeInWithEmailPassword, isLoadingSignin, setIsLoadingSignin };
};

export default useSigninEmailPassword;
