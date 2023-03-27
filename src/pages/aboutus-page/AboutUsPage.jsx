/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import CustomImage from '../../common/custom-image/CustomImage';
import EmailIcon from '../../common/icons/EmailIcon';
import MapIcon from '../../common/icons/MapIcon';
import PhoneIcon from '../../common/icons/PhoneIcon';
import routerLinks from '../../components/app/routerLinks';
import GeneralSettingsContext from '../../contexts/general-settings-context/GeneralSettingsContext';
import './AboutUsPage.scss';

const AboutUsPage = () => {
  const { t, i18n } = useTranslation();
  const { isLoadingGeneralSettings, fetchedGeneralSettings } = useContext(
    GeneralSettingsContext
  );

  if (isLoadingGeneralSettings) {
    return (
      <div
        style={{
          minHeight: 300,
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <LoadingOutlined style={{ fontSize: 20 }} />
      </div>
    );
  }

  if (fetchedGeneralSettings)
    return (
      <div className="shared-custom-page about-us-page">
        <CustomBreadcrubm
          arr={[
            {
              title: t('breadcrumb_section.home'),
              isLink: true,
              to: routerLinks.homePage
            },
            {
              title: t('breadcrumb_section.about_us'),
              isLink: false
            }
          ]}
        />

        <div className="custom-container">
          <div className="about-details">
            <div className="img-data-wrap">
              <p className="text-wrap">
                {fetchedGeneralSettings?.about && fetchedGeneralSettings.about}
              </p>
              <div className="img-wrap">
                <CustomImage src={fetchedGeneralSettings?.image} />
              </div>
            </div>

            <div className="contact-boxs-wrap">
              <ul className="boxs-ul">
                {fetchedGeneralSettings?.address && (
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div className="li-content">
                      <div className="li-img">
                        <MapIcon />
                      </div>
                      <div className="box-content">
                        <div className="li-title">
                          {i18n.language === 'ar' && 'العنوان'}
                          {i18n.language === 'en' && 'Address'}
                        </div>
                        <div className="li-value">
                          {fetchedGeneralSettings.address}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                {(fetchedGeneralSettings?.phone1 ||
                  fetchedGeneralSettings?.phone2) && (
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div className="li-content">
                      <div className="li-img">
                        <PhoneIcon />
                      </div>
                      <div className="box-content">
                        <div className="li-title">
                          {i18n.language === 'ar'
                            ? 'رقـــم الهاتف'
                            : 'Phone number'}
                        </div>
                        <div className="li-value">
                          {fetchedGeneralSettings?.phone1}
                        </div>
                        <div className="li-value">
                          {fetchedGeneralSettings?.phone2}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                {fetchedGeneralSettings?.email && (
                  <li
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="200"
                  >
                    <div className="li-content">
                      <div className="li-img">
                        <EmailIcon />
                      </div>
                      <div className="box-content">
                        <div className="li-title">
                          {i18n.language === 'ar'
                            ? 'البريد الاكتروني'
                            : 'Email Address'}
                        </div>
                        <div className="li-value">
                          {fetchedGeneralSettings.email}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );

  return null;
};

export default AboutUsPage;
