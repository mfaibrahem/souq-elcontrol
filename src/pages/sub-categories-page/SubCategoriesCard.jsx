import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import './SubCategoriesCard.scss';

const SubCategoriesCard = (props) => {
  const params = useParams();

  return (
    <li className="sub-category-card">
      <RouterLink
        to={routerLinks?.singleSubCategoryRoute(
          params?.categoryId,
          params?.subCategoryId
        )}
      >
        <CustomImage src={props?.image} />
      </RouterLink>
      {props?.name && <div className="card-name">{props?.name}</div>}
    </li>
  );
};

export default SubCategoriesCard;
