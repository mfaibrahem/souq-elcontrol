import React, { useContext } from 'react';
import UserContext from '../contexts/user-context/UserProvider';
import { useHistory } from 'react-router-dom';
import routerLinks from '../components/app/routerLinks';
import useCustomApiRequest from './useCustomApiRequest';
import errorNotification from '../utils/errorNotification';
import { useTranslation } from 'react-i18next';
import successNotification from '../utils/successNotification';
import signupApi from '../apis/auth/signupApi';

const useSignupEmailPassword = () => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const { setCurrentUser, setUserToState } = useContext(UserContext);
  const customApiRequest = useCustomApiRequest();
  const [isLoadingSignup, setIsLoadingSignup] = React.useState(false);
  const signMeUpWithEmailPassword = (data) => {
    setIsLoadingSignup(true);
    customApiRequest(
      signupApi(
        {
          ...data
        },
        i18n.language
      ),
      (res) => {
        setIsLoadingSignup(false);
        if (res?.data?.status === 1) {
          setCurrentUser(res.data.data);
          successNotification({
            title: 'العملية تمت بنجاح',
            message: res?.data?.message || 'تم إنشاء الحساب بنجاح'
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
        setIsLoadingSignup(false);
        errorNotification({
          title: 'حدث خطأ اثناء إنشاء الحساب',
          message: error?.response?.data?.message || 'من فضلك حاول وقت لاحق'
        });
      }
    );
  };

  return { signMeUpWithEmailPassword, isLoadingSignup, setIsLoadingSignup };
};

export default useSignupEmailPassword;
