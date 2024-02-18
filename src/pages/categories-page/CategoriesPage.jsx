import './CategoriesPage.scss';

import React from 'react';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useMainCats from '../../custom-hooks/useMainCats';

const CategoriesPage = () => {
  const { t } = useTranslation();
  const { isLoadingMainCats, allFetchedMainCats } = useMainCats();

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
      <CategoriesSection
        isLoading={isLoadingMainCats}
        cats={allFetchedMainCats}
        sectionTitle={null}
        //
        isMainCat={true}
        isSubCat={false}
        //
      />
    </div>
  );
};

export default CategoriesPage;
