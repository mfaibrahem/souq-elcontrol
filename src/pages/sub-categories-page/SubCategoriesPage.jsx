/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './SubCategoriesPage.scss';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import useSubCats from '../../custom-hooks/useSubCats';

const SubCategoriesPage = () => {
  const { isLoadingSubCats, allFetchedSubCats } = useSubCats();
  return (
    <div className="shared-custom-page sub-categories-page">
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

export default SubCategoriesPage;
