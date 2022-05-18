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
import techSuppImg from '../../assets/imgs/icons/technical-support.png';
import { Link as RouterLink } from 'react-router-dom';
import { Descriptions, Tabs } from 'antd';
import whatsAppImg from '../../assets/imgs/contact/whatsapp-white.png';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import ContactSellerModal from './ContactSellerModal';
import './ServiceCenterDetailsPage.scss';
import useServiceCenter from '../../custom-hooks/useServiceCenter';
import fixedMainCats from '../../fixedMainCats';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { TabPane } = Tabs;

const ServiceCenterDetailsPage = () => {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const { isLoading, fetchedCenter } = useServiceCenter();
  const { setModalOpened, modalOpened } = useContext(ContactSellerContext);

  const renderGalleryImages = () => {
    return fetchedCenter.service.images.map((img) => {
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
          {obj?.nameOfStore && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'إسم المركز : ' : 'Store : '}
            >
              {obj.nameOfStore}
            </Descriptions.Item>
          )}
          {obj?.address && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'العنوان : ' : 'Address : '}
            >
              {obj.address}
            </Descriptions.Item>
          )}
          {obj?.email && (
            <Descriptions.Item
              label={
                i18n.language === 'ar' ? 'البريد الاكترونى : ' : 'Email : '
              }
            >
              {obj.email}
            </Descriptions.Item>
          )}
          {obj?.phone && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'رقم الهاتف : ' : 'phone : '}
            >
              {obj.phone}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    );
  };

  if (isLoading) {
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

  if (!fetchedCenter) return <Empty description="No service found" />;

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
            to: routerLinks.categoriesRoute
          },
          {
            title: 'قسم مراكز الصيانة',
            isLink: true,
            to: routerLinks?.cities(fixedMainCats?.maintenanceService)
          },
          {
            title: fetchedCenter?.cityForServiceCenter?.name,
            isLink: true,
            to: servicesRouterLinks?.serviceCentersRoute(
              params?.categoryId,
              fetchedCenter?.cityForServiceCenter?.id
            )
          },
          {
            title: fetchedCenter?.name,
            isLink: false
          }
        ]}
      />

      <div className="custom-container">
        <section className="service-details-section">
          <div className="gallery-details-wrap">
            <div className="gallery-wrap">
              {fetchedCenter?.images?.length > 0 ? (
                <ImageGallery
                  items={
                    fetchedCenter?.images?.length > 0
                      ? renderGalleryImages()
                      : []
                  }
                />
              ) : (
                <CustomImage
                  className="service-details-fallback-img"
                  src={fetchedCenter?.image}
                />
              )}
            </div>
            <div className="details-parent-wrap">
              {fetchedCenter?.name && (
                <div className="service-name">
                  <div className="icon-wrap">
                    <CustomImage src={techSuppImg} />
                  </div>
                  <span className="name-span">{fetchedCenter?.name}</span>
                </div>
              )}

              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    i18n.language === 'ar'
                      ? 'الخدمات المقدمة'
                      : 'Available services'
                  }
                  key="1"
                >
                  <div className="desc-tab-content">
                    {fetchedCenter?.desc && (
                      <div className="desc-details">
                        {parse(fetchedCenter.service.desc)}
                      </div>
                    )}

                    {fetchedCenter?.price && (
                      <div className="price-wrap">
                        <div className="price-itself">
                          {fetchedCenter?.price}{' '}
                          {i18n.language === 'ar' ? 'جنيه' : 'LE'}
                        </div>
                      </div>
                    )}

                    <div className="order-message-links-wrap">
                      {/* <button
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
                      </button> */}

                      <a
                        className={`whatsapp-link ${i18n.dir()}`}
                        href={`https://wa.me/${
                          fetchedCenter?.store_whatsapp || fetchedCenter?.phone
                        }`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={whatsAppImg} alt="whats app" />
                        <span>
                          {i18n.language === 'ar' && 'تحدث إلى المركز'}
                          {i18n.language === 'en' && 'Contact Service Center'}
                        </span>
                      </a>
                    </div>
                  </div>
                </TabPane>

                <TabPane
                  tab={
                    i18n.language === 'ar'
                      ? 'العنوان ومواعيد العمل'
                      : 'Address and work hours'
                  }
                  key="2"
                >
                  {renderStoreDetails(fetchedCenter)}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </section>
      </div>
      {modalOpened && <ContactSellerModal store={fetchedCenter} />}
    </div>
  );
};

export default ServiceCenterDetailsPage;
