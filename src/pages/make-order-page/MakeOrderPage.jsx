import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import CustomImage from '../../common/custom-image/CustomImage';
import techSuppImg from '../../assets/imgs/icons/technical-support.png';

import routerLinks from '../../components/app/routerLinks';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useServiceDetails from '../../custom-hooks/useServiceDetails';
import './MakeOrderPage.scss';
import MakeOrderForm from './MakeOrderForm';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MakeOrderPage = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoadingServiceDetails, fetchedServiceDetails } =
    useServiceDetails();

  const renderStoreDetails = (obj) => {
    return (
      <div className="store-details-wrap">
        {obj?.name && <p className="store-name">{obj.name}</p>}
      </div>
    );
  };

  const renderInstructions = (obj) => {
    return (
      <div className="instructions-price-wrap">
        {obj?.instructions && (
          <div className="instructions-wrap">
            <p className="instructions-title">الإرشادات</p>
            <div className="instructions-details">
              {parse(obj.instructions)}
            </div>
          </div>
        )}

        {obj.price && (
          <div className="price-wrap">
            <p className="price-title">سعر الخدمة</p>
            <div className="price-itself">{obj.price} ريـــال</div>
          </div>
        )}
      </div>
    );
  };

  if (isLoadingServiceDetails) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 332
        }}
      >
        <Spin />
      </div>
    );
  }

  if (!fetchedServiceDetails) return <Empty description="No service found" />;

  return (
    <div className="shared-custom-page make-order-page">
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
            to: routerLinks?.categoriesRoute
          },
          {
            title: fetchedServiceDetails?.service?.mainCat?.name,
            isLink: true,
            to: routerLinks?.subCategoriesRoute(params?.categoryId)
          },
          {
            title: fetchedServiceDetails?.service?.car?.name,
            isLink: true,
            to: routerLinks?.carsRoute(
              params?.categoryId,
              params?.subCategoryId
            )
          },
          {
            title: t('breadcrumb_section.services'),
            isLink: true,
            to: routerLinks?.servicesRoute(
              params?.categoryId,
              params?.subCategoryId,
              params?.carId
            )
          },
          {
            title: fetchedServiceDetails?.service?.name,
            isLink: true,
            to: routerLinks?.serviceDetailsRoute(
              params?.categoryId,
              params?.subCategoryId,
              params?.carId,
              params?.serviceId
            )
          },
          {
            title: t('breadcrumb_section.makeOrder'),
            isLink: false
          }
        ]}
      />

      <div className="custom-container">
        <section className="make-order-section">
          <div className="brief-parent">
            {fetchedServiceDetails?.service?.name && (
              <div className="service-name">
                <div className="icon-wrap">
                  <CustomImage src={techSuppImg} />
                </div>
                <span className="name-span">
                  {fetchedServiceDetails?.service?.name}
                </span>
              </div>
            )}
            <div
              className="brief-wrap"
              style={{
                backgroundImage: `url(${fetchedServiceDetails?.service?.image})`
              }}
            >
              <div className="brief-overlay"></div>

              <div className="brief-content">
                {fetchedServiceDetails?.service?.store &&
                  renderStoreDetails(fetchedServiceDetails.service.store)}
                {fetchedServiceDetails?.service &&
                  renderInstructions(fetchedServiceDetails.service)}
              </div>
            </div>
          </div>
          <div className="make-order-form-wrap">
            <MakeOrderForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MakeOrderPage;
