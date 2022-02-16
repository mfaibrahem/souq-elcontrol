/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, Link as RouterLink } from 'react-router-dom';
import LanguageButton from '../../common/language-button/LanguageButton';
import Logo from '../../common/logo/Logo';
import mainAppBarLinks from './mainAppBarLinks';
import './MainAppBarMd.scss';
import UserContext from '../../contexts/user-context/UserProvider';
import routerLinks from '../app/routerLinks';
import MainAppMessages from './MainAppMessages';
import useSignout from '../../custom-hooks/useSignout';
import CustomImage from '../../common/custom-image/CustomImage';
import MainAppBarSearchBar from './MainAppBarSearchBar';

const MainAppBarMd = ({ className, exceeds0 }) => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { user, loggedIn } = useContext(UserContext);
  const { signMeOut } = useSignout();
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const DrawerTitle = () => {
    if (user?.name) {
      return (
        <RouterLink
          onClick={() => setVisible(false)}
          to={routerLinks?.profilePage}
          className="username-img"
        >
          <CustomImage className="user-img" src={user?.image} />
          <div className="username">{user?.name}</div>
        </RouterLink>
      );
    }
    return i18n.language === 'ar' ? 'سوق الكنترول' : 'ECU Souq';
  };

  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t, user).map(({ id, name, link }) => (
          <li key={id} onClick={onClose}>
            <NavLink
              activeClassName="active-link"
              className={`nav-link`}
              to={link}
              exact
            >
              {name}
              <div className="active-img-wrap"></div>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={className}>
      <div className="custom-container">
        <div className="nav-content-wrapper">
          <div className="nav-lang-wrapper">
            <Button
              color="inherit"
              onClick={showDrawer}
              edge="start"
              // className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuOutlined />
            </Button>
            <LanguageButton />
          </div>

          {!exceeds0 && pathname === routerLinks?.homePage && (
            <MainAppBarSearchBar />
          )}

          <Logo
            colored={exceeds0 || pathname !== '/'}
            className="main-app-bar-logo"
          />
        </div>
      </div>
      <Drawer
        title={<DrawerTitle />}
        placement="right"
        onClose={onClose}
        visible={visible}
        className="header-md-drawer"
        // anchor="right"
      >
        <div className="logo-links">
          {/* <Logo className="main-app-bar-logo" /> */}
          {renderNavLinks()}
        </div>

        {!loggedIn ? (
          <RouterLink
            className="appbar-signin-link"
            to={routerLinks?.signinPage}
            onClick={() => setVisible(false)}
          >
            {t('signinSignup.signin')}
          </RouterLink>
        ) : (
          <div className="signout-messages-wrap">
            <button
              onClick={() => {
                signMeOut();
                setVisible(false);
              }}
            >
              {i18n.language === 'ar' && 'تسجيل الخروج'}
              {i18n.language === 'en' && 'Signout'}
            </button>
            <div className="messages-wrap">
              <MainAppMessages isAppbarMd />
            </div>
          </div>
        )}
        <a
          className="appbar-signin-link"
          href="https://ecusouq.com/backend/store/login"
          target="_blank"
          rel="noreferrer"
        >
          {i18n.language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </a>
      </Drawer>
    </div>
  );
};

export default MainAppBarMd;
