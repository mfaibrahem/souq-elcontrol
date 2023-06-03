import { LoadingOutlined } from '@ant-design/icons';
import { Descriptions, Empty, notification, Tabs } from 'antd';
import parse from 'html-react-parser';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageGallery from 'react-image-gallery';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';
import whatsAppImg from '../../assets/imgs/contact/whatsapp-white.png';
import fbImg from '../../assets/imgs/icons/share-icons/fb.svg';
import telegramImg from '../../assets/imgs/icons/share-icons/telegram.svg';
import twitterImg from '../../assets/imgs/icons/share-icons/twitter.svg';
import whatsappImg from '../../assets/imgs/icons/share-icons/whatsapp.svg';
import techSuppImg from '../../assets/imgs/icons/technical-support.png';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import UserContext from '../../contexts/user-context/UserProvider';
import useServiceDetails from '../../custom-hooks/useServiceDetails';
import ContactSellerModal from './ContactSellerModal';
import ReportServiceModal from './ReportServiceModal';
import './ServiceDetailsPage.scss';
import StoreRateModal from './StoreRateModal';
import { Helmet } from 'react-helmet-async';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const [copyCount, setCopyCount] = useState(0);
  useEffect(() => {
    if (copyCount) {
      notification.success({
        message: 'Copied to Clipboard',
        duration: 1.5,
        onClick: () => {
          // console.log('Notification Clicked!');
        }
      });
    }
  }, [copyCount]);

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
    <>
      <Helmet prioritizeSeoTags>
        <title>{fetchedServiceDetails?.service?.car?.name}</title>
        <meta
          data-react-helmet="true"
          name="description"
          content="Beginner friendly page for learning React Helmet."
        />

        <meta
          data-react-helmet="true"
          property="og:title"
          content={fetchedServiceDetails?.service?.car?.name}
        />
        <meta
          data-react-helmet="true"
          property="og:type"
          content="video.movie"
        />
        <link
          rel="canonical"
          href={`${
            process.env.REACT_APP_WEBSITE_URL
          }${servicesRouterLinks?.serviceDetailsRoute(
            params?.categoryId,
            params?.subCategoryId,
            params?.carId,
            params?.serviceId
          )}`}
        />

        <meta
          data-react-helmet="true"
          property="og:url"
          content={`${
            process.env.REACT_APP_WEBSITE_URL
          }${servicesRouterLinks?.serviceDetailsRoute(
            params?.categoryId,
            params?.subCategoryId,
            params?.carId,
            params?.serviceId
          )}`}
          data-rh="true"
        />
        <meta
          data-react-helmet="true"
          property="og:image"
          content={fetchedServiceDetails?.service?.image}
          data-rh="true"
        />

        <meta
          data-react-helmet="true"
          name="description"
          content="Beginner friendly page for learning React Helmet."
        />
        <meta data-react-helmet="true" property="og:title" content="The Rock" />
        <meta
          data-react-helmet="true"
          property="og:type"
          content="video.movie"
        />
      </Helmet>
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

                <Tabs
                  defaultActiveKey="1"
                  items={[
                    {
                      key: '1',
                      label:
                        i18n.language === 'ar' ? 'وصف الخدمة' : 'Description',
                      children: (
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
                                {i18n.language === 'ar'
                                  ? 'اطلب الان'
                                  : 'Order Now'}
                              </RouterLink>
                            )}
                          </div>
                        </div>
                      )
                    },
                    {
                      key: '2',
                      label:
                        i18n.language === 'ar'
                          ? 'تواصل مع البائع'
                          : 'Contact Seller',
                      children:
                        fetchedServiceDetails?.service?.store &&
                        renderStoreDetails(fetchedServiceDetails.service.store)
                    },
                    {
                      key: '3',
                      label:
                        i18n.language === 'ar'
                          ? 'الإرشـــادات'
                          : 'Instructions',
                      children:
                        fetchedServiceDetails?.service &&
                        renderInstructions(fetchedServiceDetails.service)
                    }
                  ]}
                />
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
                      // url={`https://gogole.com`}
                      // url={`${
                      //   process.env.REACT_APP_WEBSITE_URL
                      // }${servicesRouterLinks?.serviceDetailsRoute(
                      //   fetchedServiceDetails?.service?.mainCat?.id,
                      //   fetchedServiceDetails?.service?.cat?.id,
                      //   fetchedServiceDetails?.service?.car?.id,
                      //   fetchedServiceDetails?.service?.id
                      // )}`}
                      url="https://ecusouq.com/categories/1/sub-categories/20/cars/15/services/2/details"
                      title={`${fetchedServiceDetails?.service?.name}\n${fetchedServiceDetails?.service?.desc}`}
                      beforeOnClick={async () => {
                        await sleep(3000);
                      }}
                      hashtag="laksjdf "
                      separator="\n"
                    >
                      <img src={fbImg} alt="fb" />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      // url={`${
                      //   process.env.REACT_APP_WEBSITE_URL
                      // }${servicesRouterLinks?.serviceDetailsRoute(
                      //   params?.categoryId,
                      //   params?.subCategoryId,
                      //   params?.carId,
                      //   params?.serviceId
                      // )}`}
                      url={`${
                        process.env.REACT_APP_WEBSITE_URL
                      }${servicesRouterLinks?.serviceDetailsRoute(
                        fetchedServiceDetails?.service?.mainCat?.id,
                        fetchedServiceDetails?.service?.cat?.id,
                        fetchedServiceDetails?.service?.car?.id,
                        fetchedServiceDetails?.service?.id
                      )}`}
                      title={`${fetchedServiceDetails?.service?.name}\n${fetchedServiceDetails?.service?.desc}`}
                      separator="\n"
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
                      title={`${fetchedServiceDetails?.service?.name}\n${fetchedServiceDetails?.service?.desc}`}
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
                      title={`${fetchedServiceDetails?.service?.name}\n${fetchedServiceDetails?.service?.desc}`}
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
    </>
  );
};

export default ServiceDetailsPage;
