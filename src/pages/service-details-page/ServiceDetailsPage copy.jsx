import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useServiceDetails from '../../custom-hooks/useServiceDetails';
import infoImg from '../../assets/imgs/icons/info.png';
import techSuppImg from '../../assets/imgs/icons/technical-support.png';
import moneyImg from '../../assets/imgs/icons/money.png';
import commentImg from '../../assets/imgs/icons/comment.png';
import { Link as RouterLink } from 'react-router-dom';
import './ServiceDetailsPage.scss';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ServiceDetailsPage = () => {
  const params = useParams();
  const { t } = useTranslation();
  const { isLoadingServiceDetails, fetchedServiceDetails } =
    useServiceDetails();

  const renderGalleryImages = () => {
    return fetchedServiceDetails.service.images.map((img) => {
      return {
        original: img?.image,
        thumbnail: img?.image
      };
    });
  };

  const renderStoreDetails = (obj) => {
    return (
      <div className="store-details-wrap">
        {obj?.name && (
          <div className="store-name">
            <div className="icon-wrap">
              <CustomImage src={techSuppImg} />
            </div>
            <p>{obj.name}</p>
          </div>
        )}
      </div>
    );
  };

  const renderInstructions = (obj) => {
    return (
      <div className="instructions-price-wrap">
        {obj?.instructions && (
          <div className="instructions-wrap">
            <div className="wrap-title">
              <div className="icon-wrap">
                <CustomImage src={infoImg} />
              </div>
              <p>الإرشادات</p>
            </div>
            <div className="instructions-details">
              {parse(obj.instructions)}
            </div>
          </div>
        )}

        {obj.price && (
          <div className="price-wrap">
            <div className="wrap-title">
              <div className="icon-wrap">
                <CustomImage src={moneyImg} />
              </div>
              <p>سعر الخدمة</p>
            </div>
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
    <div className="shared-custom-page service-details-page">
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
            isLink: false
          }
        ]}
      />

      <div className="custom-container">
        <section className="service-details-section">
          <div className="gallery-details-wrap">
            <div className="gallery-wrap">
              {fetchedServiceDetails?.service?.images?.length > 0 ? (
                <ImageGallery
                  items={
                    fetchedServiceDetails?.service?.images?.length > 0
                      ? renderGalleryImages()
                      : []
                  }
                />
              ) : (
                <CustomImage
                  className="service-details-fallback-img"
                  src={fetchedServiceDetails?.service?.image}
                />
              )}
            </div>
            <div className="details-wrap">
              {fetchedServiceDetails?.service?.store &&
                renderStoreDetails(fetchedServiceDetails.service.store)}
              {fetchedServiceDetails?.service &&
                renderInstructions(fetchedServiceDetails.service)}

              {fetchedServiceDetails?.service?.price && (
                <RouterLink
                  className="make-order-link"
                  to={routerLinks?.serviceMakeOrderRoute(
                    params?.categoryId,
                    params?.subCategoryId,
                    params?.carId,
                    fetchedServiceDetails?.service?.id
                  )}
                >
                  إدفـــع
                </RouterLink>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
