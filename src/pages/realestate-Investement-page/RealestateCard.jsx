import React from 'react';
import { PushpinOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';
import bedroomIcon from '../../assets/imgs/icons/bed-room-icon.png';
import restRoomIcon from '../../assets/imgs/icons/rest-room-icon.png';
import './RealestateCard.scss';
import CustomImage from '../../common/custom-image/CustomImage';

const RealestateCard = ({
  id,
  image,
  title,
  address,
  rooms,
  bathrooms,
  price
}) => {
  return (
    <li className="realestate-card" data-aos="fade">
      <div className="card-content">
        <div className="realestate-img-wrap">
          {/* <img src={image} alt={title} /> */}
          <CustomImage src={image} alt={title} />
        </div>
        <div className="card-data">
          <div className="card-name bold-font">{title}</div>
          <div className="card-address">
            <PushpinOutlined style={{ fontSize: 18, marginLeft: 4 }} />
            {address}
          </div>
          <div className="extra-row">
            <div className="bedrooms">
              <div className="rooms-title">
                <img src={bedroomIcon} alt="bedroom" />
                غرف النوم
              </div>
              <div className="rooms-value">( {rooms} )</div>
            </div>
            <div className="restrooms">
              <div className="rooms-title">
                <img src={restRoomIcon} alt="restroom" />
                حمام
              </div>
              <div className="rooms-value">( {bathrooms} )</div>
            </div>
          </div>
          <div className="price-details-link">
            <div className="price-wrap">{price} جنيه</div>
            <RouterLink
              className="details-link"
              to={routerLinks.realestateDetailsPage(id)}
            >
              للحجز والإستعلام
            </RouterLink>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RealestateCard;
