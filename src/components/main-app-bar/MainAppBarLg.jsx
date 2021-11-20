/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import LanguageButton from '../../common/language-button/LanguageButton';
import Logo from '../../common/logo/Logo';
import mainAppBarLinks from './mainAppBarLinks';
import SearchIcon from '../../common/icons/SearchIcon';
import routerLinks from '../app/routerLinks';
import UserContext from '../../contexts/user-context/UserProvider';
import MainAppProfileMenu from './MainAppProfileMenu';
import MainAppMessages from './MainAppMessages';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import searchServicesApi from '../../apis/categories-apis/searchServicesApi';
import checkRes from '../../utils/checkRes';
import { Dropdown, Menu } from 'antd';
import './MainAppBarLg.scss';

const MainAppBarLg = ({ className, exceeds0 }) => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { loggedIn, user } = useContext(UserContext);
  const [isSearching, setIsSearching] = React.useState(false);
  const [fetchedServices, setFetchedServices] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };
  // const debouncedCallback = debounce(callback, waitTime);
  const debouncedChangeHandler = React.useCallback(
    debounce(changeHandler, 400),
    []
  );
  const customApiRequest = useCustomApiRequest();
  React.useEffect(() => {
    if (query) {
      setIsSearching(true);
      customApiRequest(
        searchServicesApi({ search: query }, i18n.language),
        (res) => {
          setIsSearching(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedServices(res.data.data);
          }
        },
        (error) => {
          setIsSearching(false);
        }
      );
    }
  }, [query]);

  const renderServicesMenu = () => {
    if (query) {
      if (isSearching) {
        return <Menu.Item>جــارى البحث ...</Menu.Item>;
      }
      if (fetchedServices?.length > 0) {
        return fetchedServices.map((serv) => (
          <Menu.Item key={serv?.id}>
            <RouterLink
              to={routerLinks.serviceDetailsRoute(
                serv?.mainCat?.id,
                serv?.cat?.id,
                serv?.car?.id,
                serv?.id
              )}
            >
              {serv?.name}
            </RouterLink>
          </Menu.Item>
        ));
      }
      if (fetchedServices?.length === 0) {
        return <Menu.Item>No Data found !!!</Menu.Item>;
      }
      return null;
    }
    return <Menu.Item>إبحث عن خدمتــك ...</Menu.Item>;
  };

  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t, user).map(({ id, name, link }) => (
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
                <>
                  <MainAppProfileMenu />
                  <MainAppMessages />
                </>
              )}
              <LanguageButton />
            </div>
          ) : pathname === '/' ? (
            <div className="main-search-lang-wrap">
              <Dropdown
                arrow
                trigger={['click']}
                // disabled={loadingSignout}
                overlay={<Menu>{renderServicesMenu()}</Menu>}
                onVisibleChange={(visible) => {
                  if ((!visible && !query) || !query) {
                    setFetchedServices([]);
                  }
                }}
              >
                <form className="main-app-search-form">
                  <label>
                    <div className="icon-wrap">
                      {isSearching ? <LoadingOutlined /> : <SearchIcon />}
                    </div>
                    <input
                      type="text"
                      name="main_app_search"
                      placeholder={t('main_app_search.placeholder')}
                      onChange={debouncedChangeHandler}
                    />
                  </label>
                </form>
              </Dropdown>

              <div className="signin-lang-wrap">
                {!loggedIn ? (
                  <RouterLink
                    className="appbar-signin-link"
                    to={routerLinks?.signinPage}
                  >
                    {t('signinSignup.signin')}
                  </RouterLink>
                ) : (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        gap: 22,
                        alignItems: 'cener'
                      }}
                    >
                      <MainAppProfileMenu />
                      <MainAppMessages />
                    </div>
                  </>
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
                <>
                  <MainAppProfileMenu />
                  <MainAppMessages />
                </>
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
