/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import Loading from '../../common/loading/Loading';
import Routes from './Routes';
import AppLayout from './Layout';
import { useEffect } from 'react';
import axios from 'axios';
import { ConfigProvider } from 'antd';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import ReactNotification from 'react-notifications-component';
import DocTitleScrollTop from '../../utils/DocTitleScrollTop';
import '../../i18n';
import UserContext from '../../contexts/user-context/UserProvider';
import myInfoApi from '../../apis/auth/myInfoApi';
import checkRes, { customApiRequest } from '../../utils/checkRes';
import routerLinks from './routerLinks';
import getAllCategoriesApi from '../../apis/categories-apis/getAllCategoriesApis';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
axios.defaults.baseURL = 'http://compound.emir.life/api';

function App() {
  const { i18n } = useTranslation();
  const history = useHistory();
  const { user, removeCurrentUser } = useContext(UserContext);
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);

  useEffect(() => {
    AOS.init({
      duration: 1500
    });
  }, []);
  DocTitleScrollTop('');

  // useEffect(() => {
  //   if (user) {
  //     let isMounted = true;
  //     const fetchInfo = async () => {
  //       try {
  //         const res = await myInfoApi(user?.token, i18n.language);
  //         if (isMounted) {
  //           // is response is success
  //           if (checkRes(res)) {
  //           } else {
  //             removeCurrentUser();
  //             history.push(routerLinks.signinPage);
  //           }
  //         }
  //       } catch (error) {
  //         removeCurrentUser();
  //         history.push(routerLinks.signinPage);
  //       }
  //     };

  //     fetchInfo();

  //     return () => {
  //       isMounted = false;
  //     };
  //   }
  // }, []);

  const [loading, setLoading] = React.useState(false);
  const customApiReuqest1 = useCustomApiRequest();
  React.useEffect(() => {
    setLoading(true);
    const successCallback = (res) => {
      setLoading(false);
    };
    const unAuthCallback = () => {
      console.log('unathanticated');
      setLoading(false);
    };
    const errorCallback = (err) => {
      console.log('error : ', err);
      setLoading(false);
    };
    customApiReuqest1(
      getAllCategoriesApi(),
      successCallback,
      unAuthCallback,
      errorCallback
    );
    // try {
    //   let isMounted = true;

    // } catch (error) {

    // }
  }, []);
  console.log('loading :', loading);

  return (
    <div className={`app app-${i18n.dir()}`}>
      <Suspense fallback={<Loading />}>
        <ConfigProvider direction={i18n.dir()}>
          <ReactNotification className={i18n.dir()} />
          <Switch>
            <AppLayout>
              <Routes />
            </AppLayout>

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </ConfigProvider>
      </Suspense>
    </div>
  );
}

export default App;
