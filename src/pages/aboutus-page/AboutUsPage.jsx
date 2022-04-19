/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import aboutImg from '../../assets/imgs/about/about-img.png';
import CustomImage from '../../common/custom-image/CustomImage';
import parse from 'html-react-parser';
import { LoadingOutlined } from '@ant-design/icons';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import getAboutUsApi from '../../apis/homepage/aboutUsApi';
import checkRes from '../../utils/checkRes';
import PhoneIcon from '../../common/icons/PhoneIcon';
import EmailIcon from '../../common/icons/EmailIcon';
import MapIcon from '../../common/icons/MapIcon';
import './AboutUsPage.scss';
import getHomepageDataApi from '../../apis/homepage/getHomepageDataApi';
import FeaturedSection from '../home-page/FeaturedSection';
import HowItWorksSection from '../home-page/HowItWorksSection';

const AboutUsPage = () => {
  const { t, i18n } = useTranslation();

  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchedData, setFetchedData] = React.useState(null);
  const customApiRequest = useCustomApiRequest();
  const [isLoadingHome, setIsLoadingHome] = React.useState(false);
  const [homeData, setHomeData] = React.useState(null);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setIsLoadingHome(true);
      customApiRequest(
        getHomepageDataApi(i18n.language),
        (res) => {
          setIsLoadingHome(false);
          if (checkRes(res) && res?.data?.data) {
            setHomeData(res.data.data);
          } else {
          }
        },
        (error) => {
          setIsLoadingHome(false);
        }
      );
    }
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getAboutUsApi(i18n.language),

        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedData(res.data.data);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  if (isLoading) {
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

  if (fetchedData)
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
              <div
                className="about-data"
                data-aos="fade"
                data-aos-duration="400"
              >
                {/* {fetchedData?.about && parse(fetchedData.about)} */}
                <HowItWorksSection
                  isLoading={isLoadingHome}
                  sectionData={homeData?.howWork}
                />
              </div>
              {/* <div className="img-wrap">
                <CustomImage src={aboutImg} />
              </div> */}
            </div>

            <div className="contact-boxs-wrap">
              <ul className="boxs-ul">
                {fetchedData?.address && (
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
                        <div className="li-value">{fetchedData.address}</div>
                      </div>
                    </div>
                  </li>
                )}
                {(fetchedData?.phone1 || fetchedData?.phone2) && (
                  <li data-aos="fade-up" data-aos-duration="600">
                    <div className="li-content">
                      <div className="li-img">
                        <PhoneIcon />
                      </div>
                      <div className="box-content">
                        <div className="li-title">رقـــم الهاتف</div>
                        <div className="li-value">{fetchedData?.phone1}</div>
                        <div className="li-value">{fetchedData?.phone2}</div>
                      </div>
                    </div>
                  </li>
                )}
                {fetchedData?.email && (
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
                        <div className="li-title">البريد الاكترونى</div>
                        <div className="li-value">{fetchedData.email}</div>
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
