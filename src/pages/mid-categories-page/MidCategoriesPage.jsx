import React from 'react';
import './MidCategoriesPage.scss';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import useSubCats from '../../custom-hooks/useSubCats';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import { useTranslation } from 'react-i18next';
import routerLinks from '../../components/app/routerLinks';

const MidCategoriesPage = () => {
  const { isLoadingSubCats, allFetchedSubCats } = useSubCats();
  const { t } = useTranslation();
  return (
    <div className="shared-custom-page sub-categories-page">
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
            to: routerLinks?.categoriesRoute
          },
          {
            title: allFetchedSubCats?.title,
            isLink: false
          }
        ]}
      />
      <CategoriesSection
        isLoading={isLoadingSubCats}
        cats={allFetchedSubCats?.cats}
        sectionTitle={allFetchedSubCats?.title}
        //
        isMainCat={false}
        isSubCat={true}
        //
      />
    </div>
  );
};

export default MidCategoriesPage;
