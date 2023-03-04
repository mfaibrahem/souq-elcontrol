/* eslint-disable react-hooks/exhaustive-deps */
import { Dropdown, Menu } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import SearchIcon from '../../common/icons/SearchIcon';
import searchServicesApi from '../../apis/categories-apis/searchServicesApi';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
import { LoadingOutlined } from '@ant-design/icons';
import routerLinks from '../app/routerLinks';
import { useTranslation } from 'react-i18next';

const MainAppBarSearchBar = () => {
  const { i18n, t } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [query, setQuery] = useState('');
  const changeHandler = (event) => {
    setQuery(event.target.value);
  };
  // const debouncedCallback = debounce(callback, waitTime);
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 400), []);

  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
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
        return [
          {
            key: 'searching_key',
            label: t('main_app_search.searching')
          }
        ];
      }
      if (fetchedServices?.length > 0) {
        return fetchedServices.map((serv) => ({
          key: serv?.id,
          label: (
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
          )
        }));
      }
      if (fetchedServices?.length === 0) {
        return [
          {
            key: 'no-data-found',
            label: 'No Data found !!!'
          }
        ];
      }
      return [];
    }
    return (
      <Menu.Item key="placeholder_key">
        {t('main_app_search.placeholder')}
      </Menu.Item>
    );
  };

  return (
    <Dropdown
      menu={{
        items: renderServicesMenu()
      }}
      arrow
      trigger={['click']}
      // disabled={loadingSignout}
      onOpenChange={(visible) => {
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
  );
};

export default MainAppBarSearchBar;
