/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import LanguageButton from '../../common/language-button/LanguageButton';
import Logo from '../../common/logo/Logo';
import mainAppBarLinks from './mainAppBarLinks';
import slugify from 'slugify';
import SearchIcon from '../../common/icons/SearchIcon';
import routerLinks from '../app/routerLinks';
import UserContext from '../../contexts/user-context/UserProvider';
import MainAppProfileMenu from './MainAppProfileMenu';
import './MainAppBarLg.scss';

const MainAppBarLg = ({ className, exceeds0 }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { loggedIn } = useContext(UserContext);

  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t).map(({ id, name, link }) => (
          <li key={id}>
            <NavLink activeClassName={`active-link`} to={link} exact>
              <span>{name}</span>
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
        <div
          className={`nav-content-wrapper ${
            pathname !== '/' ? 'not-home' : ''
          }`}
        >
          <Logo
            colored={exceeds0 || pathname !== '/'}
            className="main-app-bar-logo"
          />
          {exceeds0 ? (
            <div className="nav-lang-wrapper">
              {renderNavLinks()}
              {!loggedIn ? (
                <RouterLink
                  className="appbar-signin-link"
                  to={routerLinks?.signinPage}
                >
                  {t('signinSignup.signin')}
                </RouterLink>
              ) : (
                <MainAppProfileMenu />
              )}
              <LanguageButton />
            </div>
          ) : pathname === '/' ? (
            <div className="main-search-lang-wrap">
              <form className="main-app-search-form">
                <label>
                  <div className="icon-wrap">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    name="main_app_search"
                    placeholder={t('main_app_search.placeholder')}
                  />
                </label>
              </form>
              <div className="signin-lang-wrap">
                {!loggedIn ? (
                  <RouterLink
                    className="appbar-signin-link"
                    to={routerLinks?.signinPage}
                  >
                    {t('signinSignup.signin')}
                  </RouterLink>
                ) : (
                  <MainAppProfileMenu />
                )}
                <LanguageButton />
              </div>
            </div>
          ) : (
            <div className="nav-lang-wrapper">
              {renderNavLinks()}
              {!loggedIn ? (
                <RouterLink
                  className="appbar-signin-link"
                  to={routerLinks?.signinPage}
                >
                  {t('signinSignup.signin')}
                </RouterLink>
              ) : (
                <MainAppProfileMenu />
              )}
              <LanguageButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainAppBarLg;
