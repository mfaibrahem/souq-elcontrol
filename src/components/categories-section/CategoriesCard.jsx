import React from 'react';
import CustomSharedCard from '../../common/custom-shared-card/CustomSharedCard';
import { useParams } from 'react-router-dom';
import routerLinks from '../app/routerLinks';
const CategoriesCard = (props) => {
  const params = useParams();
  return (
    <CustomSharedCard
      className="categories-card"
      {...props}
      to={
        props?.isSubCat
          ? routerLinks?.carsRoute(params?.categoryId, props?.id)
          : routerLinks?.subCategoriesRoute(props?.id)
      }
    />
  );
};

export default CategoriesCard;
