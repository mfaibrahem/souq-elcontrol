import React from 'react';
import { useTranslation } from 'react-i18next';
import MainAppBar from '../main-app-bar/MianAppBar';
import MainAppFooter from '../main-app-footer/MainAppFooter';

// import ReactNotification from 'react-notifications-component';

import './Layout.scss';

const AppLayout = ({ children }) => {
  const { i18n } = useTranslation();
  // const { Header, Content, Footer, Sider } = AntdLayout;

  return (
    <div className={`app-layout app-${i18n.dir()}`}>
      <MainAppBar />
      <div className="layout-content">{children}</div>
      <MainAppFooter />
      {/* <ReactNotification className={i18n.dir()} /> */}
    </div>
  );
};

export default AppLayout;
