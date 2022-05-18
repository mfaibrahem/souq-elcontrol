/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import './ServiceCenterSignupPage.scss';
import ServiceCenterSignupForm from './ServiceCenterSignupForm';

const ServiceCenterSignupPage = () => {
  const { t } = useTranslation();

  return (
    <div className="shared-custom-page start-selling-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.servicesCenter'),
            isLink: false
          }
        ]}
      />

      <div className="custom-container">
        <p className="main-title">{t('breadcrumb_section.servicesCenter')}</p>

        <div className="form-wrapper">
          <ServiceCenterSignupForm />
        </div>
      </div>
    </div>
  );
};

export default ServiceCenterSignupPage;
