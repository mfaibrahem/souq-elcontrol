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
import { ReactNotifications } from 'react-notifications-component';
// import DocTitleScrollTop from '../../utils/DocTitleScrollTop';
import '../../i18n';
import UserContext from '../../contexts/user-context/UserProvider';
import myInfoApi from '../../apis/auth/myInfoApi';
import checkRes from '../../utils/checkRes';
import routerLinks from './routerLinks';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import { HelmetProvider } from 'react-helmet-async';

// axios.defaults.baseURL = 'http://compound.emir.life/api';
axios.defaults.baseURL = 'https://ecusouq.com/backend/api';

function App() {
  const { i18n } = useTranslation();
  const history = useHistory();
  const { user, removeCurrentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);

  useEffect(() => {
    AOS.init({
      duration: 1500
    });
  }, []);
  // DocTitleScrollTop('');

  const customApiRequest = useCustomApiRequest();

  useEffect(() => {
    let isMounted = true;
    if (user && isMounted) {
      customApiRequest(
        myInfoApi(user?.token, i18n.language),
        (res) => {
          if (checkRes) {
            setCurrentUser({
              ...res?.data?.data,
              token: user?.token
            });
          } else {
            removeCurrentUser();
            history.push(routerLinks.signinPage);
          }
        },
        (error) => {}
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={`app app-${i18n.dir()}`}>
      <Suspense fallback={<Loading />}>
        <ConfigProvider direction={i18n.dir()}>
          <HelmetProvider>
            <ReactNotifications className={i18n.dir()} />
            <Switch>
              <AppLayout>
                <Routes />
              </AppLayout>

              <Route path="*" component={NotFoundPage} />
            </Switch>
          </HelmetProvider>
        </ConfigProvider>
      </Suspense>
    </div>
  );
}

export default App;
