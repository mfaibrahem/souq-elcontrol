/* eslint-disable eqeqeq */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Empty, Collapse, Popconfirm } from 'antd';
import MyOrderCard from './MyOrderCard';
import { CaretUpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import CancelIcon from '../../common/icons/CancelIcon';
import useCancelOrder from '../../custom-hooks/useCancelOrder';

const { Panel } = Collapse;

const MyOrdersList = ({ list, setFetchOrdersCount }) => {
  const { i18n } = useTranslation();
  const { isCancellingOrder, cancelMe } = useCancelOrder(setFetchOrdersCount);

  function confirm(obj, e) {
    e.stopPropagation();
    cancelMe({
      order_id: obj?.id
    });
  }

  function cancel(e) {
    e.stopPropagation();
  }

  const renderHeader = (obj) => {
    return (
      <div className="list-header">
        <div className="img-wrap">
          <CustomImage src={obj?.service?.image} />
        </div>
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
        <div
          className={`service-price ${i18n.dir() === 'ltr' ? 'ltr' : 'rtl'}`}
        >
          {obj?.totalPrice && obj.totalPrice}{' '}
          {i18n.language === 'ar' ? 'ريـــال' : 'SAR'}
        </div>

        {obj?.status == 1 && (
          <Popconfirm
            title="هل أنت متأكد من إلغـــاء الطلب ؟"
            onConfirm={(e) => confirm(obj, e)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ loading: isCancellingOrder }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`cancel-btn ${i18n.dir() === 'ltr' ? 'ltr' : 'rtl'}`}
            >
              <CancelIcon />
            </button>
          </Popconfirm>
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
