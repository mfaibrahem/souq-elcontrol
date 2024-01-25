import { Button, Modal } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import useCustomApiRequest from '../../../custom-hooks/useCustomApiRequest';
import checkRes from '../../../utils/checkRes';
import successNotification from '../../../utils/successNotification';
import { useHistory, useParams } from 'react-router-dom';
import UserContext from '../../../contexts/user-context/UserProvider';
import errorNotification from '../../../utils/errorNotification';
import routerLinks from '../../../components/app/routerLinks';
import makeOrderApi from '../../../apis/orders-apis/makeOrderApi';
import { makeOrderFormData } from '../MakeOrderForm';

const ConfirmOrderModal = ({
  data,
  price,
  selectedLocation,
  modalOpened,
  setModalOpened,
  setIsSubmittingForm
}) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const customApiRequest = useCustomApiRequest();
  const params = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);

  const handleSubmit = async () => {
    const mappedData = makeOrderFormData(
      data,
      selectedLocation,
      params?.serviceId
    );

    setIsSubmittingForm(true);
    customApiRequest(
      makeOrderApi(mappedData, user?.token, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
          successNotification({
            title: 'Operation done successfully',
            message: 'Order placed successfully'
          });
          if (res?.data?.data?.paymentMethod == 2) {
            // window.location.href = `https://ecusouq.com/backend/api/Fawry/payFawry?order_id=${res.data.data.id}`;
            window.location.href = `https://ecusouq.com/backend/api/kashier/makePay?order_id=${
              res?.data && res?.data?.data ? res.data.data.id : ''
            }`;
          } else {
            history.push(routerLinks?.myOrdersRoute);
          }
        } else {
          errorNotification({
            title: 'Something went wrong',
            message: res?.data?.message || 'Please try agin later'
          });
        }
      },
      (error) => {
        setIsSubmittingForm(false);

        errorNotification({
          title: 'Something went wrong',
          message: error?.response?.data?.message || 'try agin later'
        });
      }
    );
  };

  return (
    <Modal
      destroyOnClose
      getContainer={document.querySelector('.make-order-form')}
      transitionName=""
      className="confirm-order-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '642px' }}
      title={<div className="modal-title">{t('confirm_order')}</div>}
      open={modalOpened}
      onOk={() => {
        setModalOpened(false);
      }}
      onCancel={() => {
        setModalOpened(false);
      }}
      footer={false}
    >
      {/* <StoreRateForm storeId={storeId} setModalOpened={setModalOpened} /> */}
      <div className="confirm-text">
        {data.paymentMethod === '1' && t('cash_confirm')}
        {data.paymentMethod === '2' && (
          <span>
            {t('online_confirm')}{' '}
            {price && +price > 0
              ? `${(parseFloat(price) * 2.75) / 100 + 2} ${t('currency.eg')}`
              : ''}
          </span>
        )}
      </div>

      <div className="modal-action-btns">
        <Button onClick={handleSubmit} type="primary">
          {t('submit')}
        </Button>
        <Button
          onClick={() => setModalOpened(false)}
          className="cancel-btn"
          type="text"
        >
          {t('cancel')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;
