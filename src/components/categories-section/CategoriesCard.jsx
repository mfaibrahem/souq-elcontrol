import React from 'react';
import CustomSharedCard from '../../common/custom-shared-card/CustomSharedCard';
import { useParams } from 'react-router-dom';
import routerLinks from '../app/routerLinks';
import { categoryTypes } from '../../mocks';
const CategoriesCard = (props) => {
  const params = useParams();
  const getUrl = () => {
    if (props?.isSubCat && props?.showType === categoryTypes?.withCarBrand) {
      return routerLinks?.carSelectionRoute(params?.categoryId, props?.id);
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
