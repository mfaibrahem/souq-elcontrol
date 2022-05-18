import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import { LoadingOutlined } from '@ant-design/icons';
import './CitiesPage.scss';
import useCities from '../../custom-hooks/useCities';
import CityCard from './CityCard';

const CitiesPage = () => {
  const { t } = useTranslation();
  const { isLoadingCities, allFetchedCities } = useCities();
  const renderCitiesUl = () => {
    if (isLoadingCities) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 332
          }}
        >
          <LoadingOutlined style={{ fontSize: 20 }} />
        </div>
      );
    }

    if (allFetchedCities?.length === 0)
      return <Empty description="No categories found" />;
    else if (allFetchedCities?.length > 0) {
      return (
        <ul className="cars-ul">
          {allFetchedCities.map((ele) => {
            return <CityCard key={ele.id} {...ele} />;
          })}
        </ul>
      );
    }
  };

  return (
    <div className="shared-custom-page cars-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.categories'),
            isLink: true,
            to: routerLinks.categoriesRoute
          },
          {
            title: t('breadcrumb_section.cities'),
            isLink: false
          }
        ]}
      />
      <section className="cars-section">
        <div className="custom-container">{renderCitiesUl()}</div>
      </section>
    </div>
  );
};

export default CitiesPage;
