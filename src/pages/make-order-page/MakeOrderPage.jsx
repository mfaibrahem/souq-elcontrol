import React from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, Tabs, Descriptions } from 'antd';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import CustomImage from '../../common/custom-image/CustomImage';
import techSuppImg from '../../assets/imgs/icons/technical-support.png';
import { LoadingOutlined } from '@ant-design/icons';

import routerLinks from '../../components/app/routerLinks';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useServiceDetails from '../../custom-hooks/useServiceDetails';
import MakeOrderForm from './MakeOrderForm';
import './MakeOrderPage.scss';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MakeOrderPage = () => {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const { isLoadingServiceDetails, fetchedServiceDetails } =
    useServiceDetails();

  const renderStoreDetails = (obj) => {
    return (
      <div className="store-details-wrap">
        <Descriptions column={1} title={obj?.name ? obj.name : ''} bordered>
          {obj?.address && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'العنوان : ' : 'Address : '}
            >
              {obj.address}
            </Descriptions.Item>
          )}
          {obj?.country && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'الدولـــة : ' : 'Country : '}
            >
              {obj.country}
            </Descriptions.Item>
          )}
          {obj?.city && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'المدينـــة : ' : 'City : '}
            >
              {obj.city}
            </Descriptions.Item>
          )}
          {obj?.area && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'المنطقــة : ' : 'Area : '}
            >
              {obj.area}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    );
  };

  const renderInstructions = (obj) => {
    return (
      <div className="instructions-price-wrap">
        {obj?.instructions && (
          <div className="instructions-wrap">
            <div className="instructions-details">
              {parse(obj.instructions)}
            </div>
          </div>
        )}

        {obj.price && (
          <div className="price-wrap">
            <p className="price-title">سعر الخدمة</p>
            <div className="price-itself">{obj.price} جنيه</div>
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
        <LoadingOutlined style={{ fontSize: 20 }} />
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
            <div className="brief-wrap">
              <div className="brief-content">
                <Tabs
                  defaultActiveKey="1"
                  items={[
                    {
                      label:
                        i18n.language === 'ar' ? 'وصف الخدمة' : 'Description',
                      key: 1,
                      children: (
                        <div className="desc-tab-content">
                          {fetchedServiceDetails?.service?.desc && (
                            <div className="desc-details">
                              {parse(fetchedServiceDetails.service.desc)}
                            </div>
                          )}

                          {fetchedServiceDetails?.service?.price && (
                            <div className="price-wrap">
                              <div className="price-itself">
                                {fetchedServiceDetails?.service?.price}{' '}
                                {i18n.language === 'ar' ? 'جنيه' : 'LE'}
                              </div>
                            </div>
                          )}

                          <CustomImage
                            src={fetchedServiceDetails?.service?.image}
                            className="service-img"
                          />
                        </div>
                      )
                    },
                    {
                      label:
                        i18n.language === 'ar'
                          ? 'تواصل مع البائع'
                          : 'Contact Seller',
                      key: 2,
                      children:
                        fetchedServiceDetails?.service?.store &&
                        renderStoreDetails(fetchedServiceDetails.service.store)
                    },
                    {
                      label:
                        i18n.language === 'ar'
                          ? 'الإرشـــادات'
                          : 'Instructions',
                      key: 3,
                      children:
                        fetchedServiceDetails?.service &&
                        renderInstructions(fetchedServiceDetails.service)
                    }
                  ]}
                />
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
