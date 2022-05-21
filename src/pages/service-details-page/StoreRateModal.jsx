import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import StoreRateForm from './StoreRateForm';

const StoreRateModal = ({ storeId, modalOpened, setModalOpened }) => {
  const { i18n } = useTranslation();

  return (
    <Modal
      transitionName=""
      className="report-service-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '742px' }}
      title={
        <div className="modal-title">
          {i18n.language === 'ar' ? 'الابلاغ عن مشكلة' : 'Report Service'}
        </div>
      }
      visible={modalOpened}
      onOk={() => {
        setModalOpened(false);
      }}
      onCancel={() => {
        setModalOpened(false);
      }}
      footer={false}
    >
      <StoreRateForm storeId={storeId} setModalOpened={setModalOpened} />
    </Modal>
  );
};

export default StoreRateModal;
