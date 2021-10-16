/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
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
axios.defaults.baseURL = 'http://farha.eaglez-group.com/api';

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n.dir()]);

  useEffect(() => {
    AOS.init({
      duration: 1500
    });
  }, []);
  DocTitleScrollTop('');

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
