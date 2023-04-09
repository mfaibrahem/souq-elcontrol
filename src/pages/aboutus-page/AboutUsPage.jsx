/* eslint-disable react-hooks/exhaustive-deps */
import { LoadingOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import GeneralSettingsContext from '../../contexts/general-settings-context/GeneralSettingsContext';
import './AboutUsPage.scss';
import AboutUsSection from './AboutUsSection';

const AboutUsPage = () => {
  const { t } = useTranslation();
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

        <AboutUsSection />
      </div>
    );

  return null;
};

export default AboutUsPage;
