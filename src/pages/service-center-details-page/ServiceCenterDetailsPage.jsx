import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty, Tag } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import ImageGallery from 'react-image-gallery';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import techSuppImg from '../../assets/imgs/icons/technical-support.png';
import { Descriptions, Tabs } from 'antd';
import whatsAppImg from '../../assets/imgs/contact/whatsapp-white.png';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';
import ContactSellerModal from './ContactSellerModal';
import './ServiceCenterDetailsPage.scss';
import useServiceCenter from '../../custom-hooks/useServiceCenter';
import fixedMainCats from '../../fixedMainCats';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ServiceCenterDetailsPage = () => {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const { isLoading, fetchedCenter } = useServiceCenter();
  const { modalOpened } = useContext(ContactSellerContext);

  const renderGalleryImages = () => {
    return fetchedCenter?.service?.images.map((img) => {
      return {
        original: img?.image,
        thumbnail: img?.image
      };
    });
  };

  const renderStoreDetails = () => {
    return (
      <div className="store-details-wrap">
        <Descriptions
          column={1}
          title={fetchedCenter?.name ? fetchedCenter.name : ''}
          bordered
        >
          {fetchedCenter?.nameOfStore && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'إسم المركز : ' : 'Store : '}
            >
              {fetchedCenter.nameOfStore}
            </Descriptions.Item>
          )}
          {fetchedCenter?.address && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'العنوان : ' : 'Address : '}
            >
              {fetchedCenter.address}
            </Descriptions.Item>
          )}
          {fetchedCenter?.cityForServiceCenter && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'المدينه : ' : 'City : '}
            >
              {fetchedCenter?.cityForServiceCenter?.name ?? '---'}
            </Descriptions.Item>
          )}
          {fetchedCenter?.email && (
            <Descriptions.Item
              label={
                i18n.language === 'ar' ? 'البريد الاكترونى : ' : 'Email : '
              }
            >
              {fetchedCenter.email}
            </Descriptions.Item>
          )}
          {fetchedCenter?.phone && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'رقم الهاتف : ' : 'phone : '}
            >
              {fetchedCenter.phone}
            </Descriptions.Item>
          )}
          {fetchedCenter?.workTimes && fetchedCenter?.workTimes?.length > 0 && (
            <Descriptions.Item
              label={
                i18n.language === 'ar' ? 'أوقات العمل : ' : 'Work times : '
              }
              style={{
                whiteSpace: 'nowrap'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap'
                }}
              >
                {fetchedCenter.workTimes.map((w) => (
                  <Tag key={w.id}>{w.workTime ?? ''}</Tag>
                ))}
              </div>
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

              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: '1',
                    label:
                      i18n.language === 'ar'
                        ? 'الخدمات المقدمة'
                        : 'Available services',
                    children: (
                      <div className="desc-tab-content">
                        <div className="store-details-wrap">
                          <Descriptions
                            column={1}
                            title={
                              <div>
                                <p>
                                  {fetchedCenter?.name
                                    ? fetchedCenter.name
                                    : ''}
                                </p>
                                <p style={{ marginBottom: 8 }}>
                                  {fetchedCenter?.emergencyStatus === 1 ? (
                                    <Tag color="green">
                                      {t('support_emergency')}
                                    </Tag>
                                  ) : (
                                    <Tag color="red">
                                      {t('dont_support_emergency')}
                                    </Tag>
                                  )}
                                </p>
                              </div>
                            }
                            bordered
                          >
                            {!!fetchedCenter?.mangerName && (
                              <Descriptions.Item
                                label={
                                  i18n.language === 'ar'
                                    ? 'مدير المركز : '
                                    : 'Store manager : '
                                }
                              >
                                {fetchedCenter.mangerName}
                              </Descriptions.Item>
                            )}
                            {!!fetchedCenter?.mangerPhone && (
                              <Descriptions.Item
                                label={
                                  i18n.language === 'ar'
                                    ? 'رقم هاتف المدير : '
                                    : 'Manger phone : '
                                }
                              >
                                {fetchedCenter.mangerPhone}
                              </Descriptions.Item>
                            )}
                            {!!fetchedCenter?.mangerWhatsapp && (
                              <Descriptions.Item
                                label={
                                  i18n.language === 'ar'
                                    ? 'رقم واتس اب المدير : '
                                    : 'Manager whatsapp phone : '
                                }
                              >
                                {fetchedCenter.mangerWhatsapp}
                              </Descriptions.Item>
                            )}
                          </Descriptions>
                        </div>

                        {(fetchedCenter?.desc || fetchedCenter?.services) && (
                          <div className="desc-details">
                            {parse(
                              fetchedCenter?.service?.desc ??
                                fetchedCenter?.services ??
                                ''
                            )}
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
                              fetchedCenter?.store_whatsapp ||
                              fetchedCenter?.phone
                            }`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img src={whatsAppImg} alt="whats app" />
                            <span>
                              {i18n.language === 'ar' && 'تحدث إلى المركز'}
                              {i18n.language === 'en' &&
                                'Contact Service Center'}
                            </span>
                          </a>
                        </div>
                      </div>
                    )
                  },
                  {
                    label:
                      i18n.language === 'ar'
                        ? 'العنوان ومواعيد العمل'
                        : 'Address and work hours',
                    key: '2',
                    children: renderStoreDetails(fetchedCenter)
                  }
                ]}
              />
            </div>
          </div>
        </section>
      </div>
      {modalOpened && <ContactSellerModal store={fetchedCenter} />}
    </div>
  );
};

export default ServiceCenterDetailsPage;
