/* eslint-disable react-hooks/exhaustive-deps */
import './CategoriesPage.scss';

import React from 'react';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import getAllMainCatsApi from '../../apis/categories-apis/getAllMainCatsApi';
import checkRes from '../../utils/checkRes';
import { Spin } from 'antd';

const CategoriesPage = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [mainCats, setMainCats] = React.useState([]);
  const customApiRequest = useCustomApiRequest();
  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getAllMainCatsApi(i18n.language),
        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data?.length >= 0) {
            setMainCats(res.data.data);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: 300,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Spin />
      </div>
    );
  }

  if (mainCats) {
    return (
      <div className="shared-custom-page categories-page">
        <CustomBreadcrubm
          arr={[
            {
              title: t('breadcrumb_section.home'),
              isLink: true,
              to: routerLinks.homePage
            },
            {
              title: t('breadcrumb_section.categories'),
              isLink: false
            }
          ]}
        />
        <div className="custom-container">
          <CategoriesSection cats={mainCats} />
        </div>
      </div>
    );
  }
  return null;
};

export default CategoriesPage;
