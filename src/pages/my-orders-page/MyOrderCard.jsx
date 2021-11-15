/* eslint-disable eqeqeq */
import { Descriptions } from 'antd';
import parse from 'html-react-parser';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';
import './MyOrdersCard.scss';

const MyOrderCard = ({ order }) => {
  const { i18n } = useTranslation();

  const renderStoreDetails = (obj) => {
    return (
      <div className="store-details-wrap">
        <Descriptions column={1} title={obj?.name ? obj.name : ''} bordered>
          {obj?.address && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'عنوان الورشـة : ' : 'Address : '}
            >
              {obj.address}
            </Descriptions.Item>
          )}
          {obj?.country && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'الدولـــة : ' : 'Country : '}
            >
              {obj.country}
            </Descriptions.Item>
          )}
          {obj?.city && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'المدينـــة : ' : 'City : '}
            >
              {obj.city}
            </Descriptions.Item>
          )}
          {obj?.area && (
            <Descriptions.Item
              label={i18n.language === 'ar' ? 'المنطقــة : ' : 'Area : '}
            >
              {obj.area}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    );
  };

  const renderInstructions = (obj) => {
    return (
      obj?.instructions && (
        <div className="instructions-wrap">
          <div className="instructions-title">
            {i18n.language === 'ar' ? 'الإرشـــادات' : 'Instructions'}
          </div>
          <div className="instructions-wrap">
            <div className="instructions-details">
              {parse(obj.instructions)}
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <li className="my-order-card">
      {order?.service?.desc && (
        <div className="desc-details">{parse(order.service.desc)}</div>
      )}

      <div className="store-instructions-wrap">
        {renderStoreDetails(order?.service?.store)}
        {renderInstructions(order?.service)}
      </div>

      <div className="order-cats-wrap">
        <RouterLink
          to={routerLinks?.subCategoriesRoute(order?.service?.mainCat?.id)}
        >
          {order?.service?.mainCat?.name && order.service.mainCat.name}
        </RouterLink>
        <RouterLink
          to={routerLinks?.carsRoute(
            order?.service?.cat?.id,
            order?.service?.cat?.id
          )}
        >
          <span>{order?.service?.cat?.name && order.service.cat.name}</span>
        </RouterLink>
        <RouterLink
          to={routerLinks?.servicesRoute(
            order?.service?.cat?.id,
            order?.service?.cat?.id,
            order?.service?.car?.id
          )}
        >
          <span>{order?.service?.car?.name && order.service.car.name}</span>
        </RouterLink>
      </div>
    </li>
  );
};

export default MyOrderCard;
