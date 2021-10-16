/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import LanguageButton from '../../common/language-button/LanguageButton';
import Logo from '../../common/logo/Logo';
import mainAppBarLinks from './mainAppBarLinks';
import './MainAppBarMd.scss';
import routerLinks from '../app/routerLinks';
import useCategories from '../../custom-hooks/useCategories';
import slugify from 'slugify';

const MainAppBarMd = ({ className }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();
  const allCategories = useCategories();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (pathname === routerLinks.blogsPage() && allCategories?.length > 0) {
      history.push(routerLinks.blogsPage(allCategories[0].id));
    }
  }, [pathname]);
  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t).map(({ id, name, link }) => (
          <li key={id} onClick={onClose}>
            <NavLink
              activeClassName="active-link"
              className={`nav-link ${
                slugify(pathname).includes('blogs') && id === 6
                  ? 'active-link'
                  : ''
              }`}
              to={link}
              exact
            >
              {name}
              <div className="active-img-wrap"></div>
            </NavLink>
          </li>
        ))}
        {allCategories?.length > 0 &&
          allCategories.map(({ id, name }) => {
            return (
              <li onClick={onClose} key={id}>
                <NavLink
                  activeClassName={`active-link`}
                  className={`nav-link ${
                    slugify(pathname).includes('blogs') && id === 6
                      ? 'active-link'
                      : ''
                  }`}
                  to={routerLinks.articlesPage(id)}
                  exact
                >
                  {name}
                  <div className="active-img-wrap"></div>
                </NavLink>
              </li>
            );
          })}
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
            {/* <LanguageButton /> */}
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
