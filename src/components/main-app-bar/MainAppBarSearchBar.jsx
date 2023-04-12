/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import searchServicesApi from '../../apis/categories-apis/searchServicesApi';
import SearchIcon from '../../common/icons/SearchIcon';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
import routerLinks from '../app/routerLinks';

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

  console.log('fetched : ', fetchedServices);

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
    return [
      {
        key: 'placeholder_key',
        label: t('main_app_search.placeholder')
      }
    ];
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
