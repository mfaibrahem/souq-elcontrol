import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CustomImage from '../custom-image/CustomImage';

import './CustomSharedCard.scss';

const CustomSharedCard = ({ to, image, name, className }) => {
  if (to) {
    return (
      <li className={`main-app-custom-card ${className ? className : ''}`}>
        <RouterLink to={to}>
          <div className="card-img">
            <CustomImage src={image} />
          </div>
          <div className="card-title">{name}</div>
        </RouterLink>
      </li>
    );
  }
  return null;
};

export default CustomSharedCard;
