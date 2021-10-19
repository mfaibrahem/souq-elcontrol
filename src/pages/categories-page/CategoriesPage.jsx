import './CategoriesPage.scss';

import React from 'react';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';

const CategoriesPage = () => {
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
      <div className="custom-container">
        <CategoriesSection />
      </div>
    </div>
  );
};

export default CategoriesPage;
