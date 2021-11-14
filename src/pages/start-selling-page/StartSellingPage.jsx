/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import './StartSellingPage.scss';
import StartSellingForm from './StartSellingForm';

const StartSellingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="shared-custom-page categories-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.categories'),
            isLink: false
          }
        ]}
      />

      <StartSellingForm />
    </div>
  );
};

export default StartSellingPage;
