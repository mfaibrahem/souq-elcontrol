import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import './CityCard.scss';

const CityCard = (props) => {
  const params = useParams();
  return (
    <li className="car-card">
      <RouterLink
        className="card-content"
        to={routerLinks?.subCategoriesRoute(props?.id)}
      >
        <div className="img-wrap">
          <CustomImage src={props?.image} />
        </div>
        {props?.name && <div className="card-name">{props?.name}</div>}
      </RouterLink>
    </li>
  );
};

export default CityCard;
