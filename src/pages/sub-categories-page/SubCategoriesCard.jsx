import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import './SubCategoriesCard.scss';

const SubCategoriesCard = (props) => {
  const params = useParams();
  console.log('params : ', params);
  return (
    <li className="sub-category-card">
      <RouterLink
        className="card-content"
        to={routerLinks?.singleSubCategoryRoute(params?.categoryId, props?.id)}
      >
        <CustomImage src={props?.image} />
        {props?.name && <div className="card-name">{props?.name}</div>}
      </RouterLink>
    </li>
  );
};

export default SubCategoriesCard;
