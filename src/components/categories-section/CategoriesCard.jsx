import React from 'react';
import CustomSharedCard from '../../common/custom-shared-card/CustomSharedCard';
import { useParams } from 'react-router-dom';
import routerLinks from '../app/routerLinks';
const CategoriesCard = (props) => {
  const params = useParams();
  const getUrl = () => {
    if (props?.isSubCat) {
      return routerLinks?.carsRoute(params?.categoryId, props?.id);
    }
    return routerLinks?.subCategoriesRoute(props?.id);
  };
  return (
    <CustomSharedCard
      className="categories-card"
      {...props}
      to={props?.url || getUrl()}
    />
  );
};

export default CategoriesCard;
