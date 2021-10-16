/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageButton from '../../common/language-button/LanguageButton';
import Logo from '../../common/logo/Logo';
import mainAppBarLinks from './mainAppBarLinks';
import './MainAppBarLg.scss';
import routerLinks from '../app/routerLinks';
import useCategories from '../../custom-hooks/useCategories';
import slugify from 'slugify';

const MainAppBarLg = ({ className }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { pathname } = useLocation();
  const allCategories = useCategories();

  useEffect(() => {
    if (pathname === routerLinks.blogsPage() && allCategories?.length > 0) {
      history.push(routerLinks.blogsPage(allCategories[0].id));
    }
  }, [pathname]);
  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t).map(({ id, name, link }) => (
          <li key={id}>
            <NavLink
              activeClassName={`active-link`}
              className={
                slugify(pathname).includes('blogs') && id === 6
                  ? 'active-link'
                  : ''
              }
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
              <li key={id}>
                <NavLink
                  activeClassName={`active-link`}
                  className={
                    slugify(pathname).includes('blogs') && id === 6
                      ? 'active-link'
                      : ''
                  }
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
          <Logo className="main-app-bar-logo" />
          <div className="nav-lang-wrapper">
            {renderNavLinks()}
            {/* <LanguageButton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAppBarLg;
