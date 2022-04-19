import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useServiceDetails from '../../custom-hooks/useServiceDetails';
import techSuppImg from '../../assets/imgs/icons/technical-support.png';
import { Link as RouterLink } from 'react-router-dom';
import { Descriptions, Tabs } from 'antd';
import ChatIcon from '../../common/icons/ChatIcon';
import whatsAppImg from '../../assets/imgs/contact/whatsapp-white.png';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import ContactSellerModal from './ContactSellerModal';
import './ServiceDetailsPage.scss';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { TabPane } = Tabs;

const ServiceDetailsPage = () => {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const { isLoadingServiceDetails, fetchedServiceDetails } =
    useServiceDetails();
  const { setModalOpened, modalOpened } = useContext(ContactSellerContext);

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
          {obj?.store_whatsapp && (
            <Descriptions.Item
              label={
                i18n.language === 'ar' ? 'رقم الواتس أب : ' : 'Whatsapp : '
              }
            >
              <a
                className={`whatsapp-link ${i18n.dir()}`}
                href={`https://wa.me/${obj.store_whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={whatsAppImg} alt="whats app" />
                <span>{obj.store_whatsapp}</span>
              </a>
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
            <div className="details-parent-wrap">
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

              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={i18n.language === 'ar' ? 'وصف الخدمة' : 'Description'}
                  key="1"
                >
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

                    <div className="order-message-links-wrap">
                      <button
                        className="message-btn"
                        onClick={() => setModalOpened(true)}
                      >
                        <div className="icon-wrap">
                          <ChatIcon />
                        </div>
                        <span className="btn-title">
                          {i18n.language === 'ar' && 'تحدث إلى البائع'}
                          {i18n.language === 'en' && 'Contact Store'}
                        </span>
                      </button>

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
                          {i18n.language === 'ar' ? 'اطلب الان' : 'Order Now'}
                        </RouterLink>
                      )}
                    </div>
                  </div>
                </TabPane>

                <TabPane
                  tab={
                    i18n.language === 'ar'
                      ? 'تواصل مع البائع'
                      : 'Contact Seller'
                  }
                  key="2"
                >
                  {fetchedServiceDetails?.service?.store &&
                    renderStoreDetails(fetchedServiceDetails.service.store)}
                </TabPane>

                <TabPane
                  tab={i18n.language === 'ar' ? 'الإرشـــادات' : 'Instructions'}
                  key="3"
                >
                  {fetchedServiceDetails?.service &&
                    renderInstructions(fetchedServiceDetails.service)}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
      {modalOpened && (
        <ContactSellerModal store={fetchedServiceDetails?.service?.store} />
      )}
    </div>
  );
};

export default ServiceDetailsPage;
