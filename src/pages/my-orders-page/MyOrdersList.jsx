/* eslint-disable eqeqeq */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Empty, Collapse, Popconfirm, Tooltip } from 'antd';
import MyOrderCard from './MyOrderCard';
import { CaretUpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import CancelIcon from '../../common/icons/CancelIcon';
import useCancelOrder from '../../custom-hooks/useCancelOrder';
import MapIcon from '../../common/icons/MapIcon';
import MoneyIcon from '../../common/icons/MoneyIcon';

const { Panel } = Collapse;

const MyOrdersList = ({ list, setFetchOrdersCount }) => {
  const { i18n } = useTranslation();
  const { isCancellingOrder, cancelMe } = useCancelOrder(setFetchOrdersCount);
  const [selectedOrderId, setSelectedOrderId] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  function confirm(obj, e) {
    e.stopPropagation();
    cancelMe(
      {
        order_id: obj?.id
      },
      setVisible,
      setSelectedOrderId
    );
  }

  function cancel(e) {
    setVisible(false);
    setSelectedOrderId('');
    e.stopPropagation();
  }

  const renderOrderBadge = (status) => {
    if (status == 1) {
      return (
        <div
          className={`order-badge new-order-badge ${
            i18n.dir() === 'ltr' ? 'ltr' : 'rtl'
          }`}
        >
          {i18n.language === 'ar' && 'طــلب جديد'}
          {i18n.language === 'en' && 'New Order'}
        </div>
      );
    } else if (status == 2) {
      return (
        <div
          className={`order-badge in-progress-order-badge ${
            i18n.dir() === 'ltr' ? 'ltr' : 'rtl'
          }`}
        >
          {i18n.language === 'ar' && 'الطب قيد الإنتظار'}
          {i18n.language === 'en' && 'Inprogress Order'}
        </div>
      );
    } else if (status == 3) {
      return (
        <div
          className={`order-badge done-order-badge ${
            i18n.dir() === 'ltr' ? 'ltr' : 'rtl'
          }`}
        >
          {i18n.language === 'ar' && 'تمت الموافقة على الطلب'}
          {i18n.language === 'en' && 'Order Accepted'}
        </div>
      );
    } else if (status == 4) {
      return (
        <div
          className={`order-badge canceled-order-badge ${
            i18n.dir() === 'ltr' ? 'ltr' : 'rtl'
          }`}
        >
          {i18n.language === 'ar' && 'تم إلغاء الطلب'}
          {i18n.language === 'en' && 'Order Cancelled'}
        </div>
      );
    }
  };

  const renderHeader = (obj) => {
    return (
      <div className="list-header">
        {renderOrderBadge(obj?.status)}
        <RouterLink
          className="img-wrap"
          to={routerLinks?.serviceDetailsRoute(
            obj?.service?.mainCat?.id,
            obj?.service?.cat?.id,
            obj?.service?.car?.id,
            obj?.service?.id
          )}
        >
          <CustomImage src={obj?.service?.image} />
        </RouterLink>
        <div className="name-address-wrap">
          <div className="service-name">
            <RouterLink
              to={routerLinks?.serviceDetailsRoute(
                obj?.service?.mainCat?.id,
                obj?.service?.cat?.id,
                obj?.service?.car?.id,
                obj?.service?.id
              )}
            >
              {obj?.service?.name && obj.service.name}
            </RouterLink>
          </div>
          {obj?.address && (
            <div className="address-wrap">
              <MapIcon />
              {obj.address}
            </div>
          )}
        </div>
        <div
          className={`price-method-wrap  ${
            i18n.dir() === 'ltr' ? 'ltr' : 'rtl'
          }`}
        >
          <div className={`service-price`}>
            {obj?.totalPrice && obj.totalPrice}{' '}
            {i18n.language === 'ar' ? 'جنيه' : 'LE'}
          </div>
          {obj?.paymentMethod && (
            <div className="payment-method-wrap">
              <MoneyIcon />
              {obj.paymentMethod == 1
                ? i18n.language === 'ar'
                  ? 'كـــاش'
                  : 'Cash'
                : ''}
              {obj.paymentMethod == 2
                ? i18n.language === 'ar'
                  ? 'إلكتــرونى'
                  : 'Visa'
                : ''}
            </div>
          )}
        </div>

        {obj?.status == 1 && (
          <Tooltip
            placement="bottom"
            title={i18n.language === 'ar' ? 'إلغاء الطلب' : 'Cancel Order !!'}
          >
            <Popconfirm
              title={
                i18n.language === 'ar'
                  ? 'هل أنت متأكد من إلغـــاء الطلب ؟'
                  : 'Cancel Order !!'
              }
              visible={selectedOrderId === obj.id && visible}
              onConfirm={(e) => confirm(obj, e)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ loading: isCancellingOrder }}
            >
              <button
                onClick={(e) => {
                  setSelectedOrderId(obj?.id);
                  setVisible(true);
                  e.stopPropagation();
                }}
                className={`cancel-btn ${i18n.dir() === 'ltr' ? 'ltr' : 'rtl'}`}
              >
                <CancelIcon />
              </button>
            </Popconfirm>
          </Tooltip>
        )}
      </div>
    );
  };

  if (list?.length === 0) {
    return <Empty description={false}>لا يوجد بيانات متاحة</Empty>;
  }

  if (list.length > 0)
    return (
      <div className="my-orders-list">
        <Collapse
          accordion
          expandIconPosition={i18n.dir() === 'ltr' ? 'right' : 'left'}
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <div className={`collapse-icon-wrap ${isActive ? 'opened' : ''}`}>
              <CaretUpOutlined />
              {/* {isActive ? <CaretDownOutlined /> : <CaretUpOutlined />} */}
            </div>
          )}
          className="site-collapse-custom-collapse"
        >
          {list.map((li) => {
            return (
              <Panel
                header={renderHeader(li)}
                key={li.id}
                className="site-collapse-custom-panel"
              >
                <MyOrderCard order={li} />
              </Panel>
            );
          })}
        </Collapse>
      </div>
    );
  return null;
};

export default MyOrdersList;
