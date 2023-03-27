import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import useCars from '../../custom-hooks/useCars';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import useSubCats from '../../custom-hooks/useSubCats';
import { Link, useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import './CarSelectionPage.scss';
import useCarSelection from '../../custom-hooks/useCarSelection';
import CustomImage from '../../common/custom-image/CustomImage';

const CarSelectionPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { isLoadingCarSelection, allFetchedSelection } = useCarSelection();
  const { allFetchedSubCats } = useSubCats();
  const renderCards = () => {
    if (isLoadingCarSelection) {
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

    if (allFetchedSelection?.length === 0)
      return <Empty description="No selection found" />;
    else if (allFetchedSelection?.length > 0) {
      return (
        <ul className="cars-selections-ul">
          {allFetchedSelection.map((ele) => {
            return (
              <Link
                className="car-selection-box"
                to={routerLinks?.carsRoute(
                  params.categoryId,
                  params.subCategoryId,
                  ele?.id
                )}
              >
                <CustomImage className="card-img" src={ele?.image} />
                {ele.name}
              </Link>
            );
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
            title: t('breadcrumb_section.carSelection'),
            isLink: false
          }
        ]}
      />
      <section className="cars-section">
        <div className="custom-container">{renderCards()}</div>
      </section>
    </div>
  );
};

export default CarSelectionPage;
