import React from 'react';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import StartSellingForm from './StartSellingForm';
import './StartSellingPage.scss';

const StartSellingPage = () => {
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
            title: t('breadcrumb_section.start_selling'),
            isLink: false
          }
        ]}
      />

      <div className="custom-container">
        <p className="main-title">{t('breadcrumb_section.start_selling')}</p>

        <div className="form-wrapper">
          <StartSellingForm />
        </div>
      </div>
    </div>
  );
};

export default StartSellingPage;
