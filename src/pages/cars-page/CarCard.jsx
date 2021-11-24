import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import './CarCard.scss';

const CarCard = (props) => {
  const params = useParams();
  return (
    <li className="car-card">
      <RouterLink
        className="card-content"
        to={routerLinks?.servicesRoute(
          params.categoryId,
          params?.subCategoryId,
          props?.id
        )}
      >
        <div className="img-wrap">
          <CustomImage src={props?.image} />
        </div>
        {props?.name && <div className="card-name">{props?.name}</div>}
      </RouterLink>
    </li>
  );
};

export default CarCard;
