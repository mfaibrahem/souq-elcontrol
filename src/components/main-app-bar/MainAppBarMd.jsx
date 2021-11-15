/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageButton from '../../common/language-button/LanguageButton';
import Logo from '../../common/logo/Logo';
import mainAppBarLinks from './mainAppBarLinks';
import './MainAppBarMd.scss';
import UserContext from '../../contexts/user-context/UserProvider';

const MainAppBarMd = ({ className }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const { user } = useContext(UserContext);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
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

          <Logo className="main-app-bar-logo" />
        </div>
      </div>
      <Drawer
        title="فرحة للتطوير العقارى"
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
      </Drawer>
    </div>
  );
};

export default MainAppBarMd;
