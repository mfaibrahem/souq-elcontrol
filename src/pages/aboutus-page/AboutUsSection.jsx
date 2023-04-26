import { LoadingOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import CustomImage from '../../common/custom-image/CustomImage';
import GeneralSettingsContext from '../../contexts/general-settings-context/GeneralSettingsContext';
import './AboutUsSection.scss';

const AboutUsSection = () => {
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
  } else if (fetchedGeneralSettings)
    return (
      <section className="about-us-section">
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

            {/* <div className="contact-boxs-wrap">
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
            </div> */}
          </div>
        </div>
      </section>
    );

  return null;
};
export default AboutUsSection;
