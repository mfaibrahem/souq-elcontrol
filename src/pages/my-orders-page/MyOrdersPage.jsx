import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import useMyOrders from '../../custom-hooks/useMyOrders';
import routerLinks from '../../components/app/routerLinks';
import { Spin } from 'antd';
import MyOrdersList from './MyOrdersList';
import './MyOrdersPage.scss';

const MyOrdersPage = () => {
  const { t } = useTranslation();
  const { isLoadingOrders, allFetchedOrders, setFetchOrdersCount } =
    useMyOrders();
  const [selectedOrders, setSelectedOrders] = React.useState('curr');

  const handleClickOrdersBtn = (type) => {
    if (type === 'curr') setSelectedOrders('curr');
    if (type === 'prev') setSelectedOrders('prev');
  };

  const renderSingleList = (list) => {
    return (
      <MyOrdersList list={list} setFetchOrdersCount={setFetchOrdersCount} />
    );
  };
  const renderMyOrders = () => {
    if (isLoadingOrders)
      return (
        <div
          style={{
            minHeight: 300,
            display: 'grid',
            placeItems: 'center'
          }}
        >
          <Spin />
        </div>
      );

    if (allFetchedOrders) {
      return (
        <div className="my-orders-wrap">
          {selectedOrders === 'curr' &&
            renderSingleList(allFetchedOrders?.currentOrders)}
          {selectedOrders === 'prev' &&
            renderSingleList(allFetchedOrders?.lastOrders)}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="shared-custom-page my-orders-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.my_orders'),
            isLink: false
          }
        ]}
      />

      <div className="custom-container">
        <div className="curr-prev-orders-btns-wrap">
          <div
            className={`curr-orders-btn ${
              selectedOrders === 'curr' ? 'selected' : ''
            }`}
            onClick={() => handleClickOrdersBtn('curr')}
          >
            {t('my_orders.btns.current')}
          </div>
          <div
            className={`prev-orders-btn ${
              selectedOrders === 'prev' ? 'selected' : ''
            }`}
            onClick={() => handleClickOrdersBtn('prev')}
          >
            {t('my_orders.btns.prev')}
          </div>
        </div>

        {renderMyOrders()}
      </div>
    </div>
  );
};

export default MyOrdersPage;
