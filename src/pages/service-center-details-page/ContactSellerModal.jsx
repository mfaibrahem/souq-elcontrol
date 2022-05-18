import React, { useContext } from 'react';
import { Modal } from 'antd';
import ContactSellerForm from './ContactSellerForm';
import { useTranslation } from 'react-i18next';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';

const ContactSellerModal = ({ store }) => {
  const { i18n } = useTranslation();
  const { modalOpened, setModalOpened } = useContext(ContactSellerContext);

  return (
    <Modal
      transitionName=""
      className="product-form-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '742px' }}
      title={
        <div className="modal-title">
          {i18n.language === 'ar' && 'تحدث إلى البائع'}
          {i18n.language === 'en' && 'Contact Seller'}
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
      <ContactSellerForm store={store} />
    </Modal>
  );
};

export default ContactSellerModal;
