import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import CarCard from './CarCard';
import useCars from '../../custom-hooks/useCars';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import useSubCats from '../../custom-hooks/useSubCats';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import './CarsPage.scss';

const CarsPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { isLoadingCars, allFetchedCars } = useCars(params?.subCategoryId);
  const { allFetchedSubCats } = useSubCats();
  const renderCarsUl = () => {
    if (isLoadingCars) {
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

    if (allFetchedCars?.length === 0)
      return <Empty description="No categories found" />;
    else if (allFetchedCars?.length > 0) {
      return (
        <ul className="cars-ul">
          {allFetchedCars.map((ele) => {
            return <CarCard key={ele.id} {...ele} />;
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
            title: allFetchedSubCats?.title,
            isLink: true,
            to: routerLinks.subCategoriesRoute(params?.categoryId)
          },
          {
            title: t('breadcrumb_section.cars'),
            isLink: false
          }
        ]}
      />
      <section className="cars-section">
        <div className="custom-container">{renderCarsUl()}</div>
      </section>
    </div>
  );
};

export default CarsPage;
