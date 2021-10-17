import React from 'react';
import CustomSharedCard from '../../common/custom-shared-card/CustomSharedCard';
import routerLinks from '../app/routerLinks';
const CategoriesCard = (props) => {
  return (
    <CustomSharedCard
      className="categories-card"
      {...props}
      to={routerLinks?.singleCategoryRoute(props?.id)}
    />
  );
};

export default CategoriesCard;
