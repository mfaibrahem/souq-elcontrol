/* eslint-disable eqeqeq */
import React from 'react';
import MapIcon from '../../common/icons/MapIcon';
import MoneyIcon from '../../common/icons/MoneyIcon';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';
const MyOrderCard = ({ order }) => {
  const { i18n } = useTranslation();
  return (
    <li className="my-order-card">
      <div className="address-payment-method-wrap">
        {order?.address && (
          <div className="address-wrap">
            <MapIcon />
            {order.address}
          </div>
        )}
        {order?.paymentMethod && (
          <div className="payment-method-wrap">
            <MoneyIcon />
            {order.paymentMethod == 1
              ? i18n.language === 'ar'
                ? 'كـــاش'
                : 'Cash'
              : ''}
            {order.paymentMethod == 2
              ? i18n.language === 'ar'
                ? 'إلكتــرونى'
                : 'Visa'
              : ''}
          </div>
        )}
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
