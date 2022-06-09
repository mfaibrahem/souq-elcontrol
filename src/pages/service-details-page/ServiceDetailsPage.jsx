import React, { useContext, useState } from 'react';
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
import whatsAppImg from '../../assets/imgs/contact/whatsapp-white.png';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import ContactSellerModal from './ContactSellerModal';
import './ServiceDetailsPage.scss';
import ReportServiceModal from './ReportServiceModal';
import UserContext from '../../contexts/user-context/UserProvider';
import { useHistory } from 'react-router-dom';
import telegramImg from '../../assets/imgs/icons/share-icons/telegram.svg';
import twitterImg from '../../assets/imgs/icons/share-icons/twitter.svg';
import whatsappImg from '../../assets/imgs/icons/share-icons/whatsapp.svg';
import StoreRateModal from './StoreRateModal';
import fbImg from '../../assets/imgs/icons/share-icons/fb.svg';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const { TabPane } = Tabs;

const ServiceDetailsPage = () => {
  const params = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const { isLoadingServiceDetails, fetchedServiceDetails } =
    useServiceDetails();
  const { modalOpened } = useContext(ContactSellerContext);
  const [reportModalOpened, setReportModalOpened] = useState(false);
  const [rateModalOpened, setRateModalOpened] = useState(false);

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
          {obj?.nameOfStore && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'إسم المتجر : ' : 'Store : '}
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
          {user && obj?.isOrdered && (
            <Descriptions.Item
              label={
                i18n.language === 'ar' ? 'تقييم البائع : ' : 'Rate seller : '
              }
            >
              <button
                onClick={() => setRateModalOpened(true)}
                className="rate-modal-btn"
              >
                {i18n.language === 'ar' ? 'تقييم البائع' : 'Rate seller'}
              </button>
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

                    <div className="price-q-wrapper">
                      {fetchedServiceDetails?.service?.price && (
                        <div className="price-wrap">
                          <div className="price-itself">
                            {fetchedServiceDetails?.service?.price}{' '}
                            {i18n.language === 'ar' ? 'جنيه' : 'LE'}
                          </div>
                        </div>
                      )}

                      <div className="quantity-wrap">
                        <span>
                          {i18n.language === 'ar'
                            ? 'الكمية المتبقية'
                            : 'Lefted Quantity'}
                        </span>
                        <span>
                          {' '}
                          ( {fetchedServiceDetails?.service?.quantity} )
                        </span>
                      </div>
                    </div>

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
                        href={`https://wa.me/${fetchedServiceDetails.service.store.store_whatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={whatsAppImg} alt="whats app" />
                        <span>
                          {i18n.language === 'ar' && 'تحدث إلى البائع'}
                          {i18n.language === 'en' && 'Contact Store'}
                        </span>
                      </a>

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
              <div className="share-report-service-btns">
                <button
                  className="report-service-btn"
                  onClick={() => {
                    if (user) {
                      setReportModalOpened(true);
                    } else {
                      history.push(routerLinks?.signinPage);
                    }
                  }}
                >
                  {i18n.language === 'ar'
                    ? 'الابلاغ عن شكوى'
                    : 'Report Service'}
                </button>

                <div className="links-wrap">
                  <span>
                    {i18n.language === 'ar' ? 'شارك الخدمة' : 'Share service'}
                  </span>
                  <FacebookShareButton
                    url={`${
                      process.env.REACT_APP_WEBSITE_URL
                    }${servicesRouterLinks?.serviceDetailsRoute(
                      params?.categoryId,
                      params?.subCategoryId,
                      params?.carId,
                      params?.serviceId
                    )}`}
                  >
                    <img src={fbImg} alt="fb" />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={`${
                      process.env.REACT_APP_WEBSITE_URL
                    }${servicesRouterLinks?.serviceDetailsRoute(
                      params?.categoryId,
                      params?.subCategoryId,
                      params?.carId,
                      params?.serviceId
                    )}`}
                  >
                    <img src={whatsappImg} alt="whatsapp" />
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={`${
                      process.env.REACT_APP_WEBSITE_URL
                    }${servicesRouterLinks?.serviceDetailsRoute(
                      params?.categoryId,
                      params?.subCategoryId,
                      params?.carId,
                      params?.serviceId
                    )}`}
                  >
                    <img src={twitterImg} alt="twitter" />
                  </TwitterShareButton>
                  <TelegramShareButton
                    url={`${
                      process.env.REACT_APP_WEBSITE_URL
                    }${servicesRouterLinks?.serviceDetailsRoute(
                      params?.categoryId,
                      params?.subCategoryId,
                      params?.carId,
                      params?.serviceId
                    )}`}
                  >
                    <img src={telegramImg} alt="telegram" />
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {modalOpened && (
        <ContactSellerModal store={fetchedServiceDetails?.service?.store} />
      )}
      {reportModalOpened && (
        <ReportServiceModal
          modalOpened={reportModalOpened}
          setModalOpened={setReportModalOpened}
          serviceId={fetchedServiceDetails?.service?.id}
        />
      )}
      {rateModalOpened && (
        <StoreRateModal
          modalOpened={rateModalOpened}
          setModalOpened={setRateModalOpened}
          storeId={fetchedServiceDetails?.service?.store?.id}
        />
      )}
    </div>
  );
};

export default ServiceDetailsPage;
