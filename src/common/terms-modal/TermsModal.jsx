import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import './TermsModal.scss';
const TermsModal = ({
  modalOpened,
  setModalOpened,
  modalData,
  isLoadingData,
  modalTitle
}) => {
  return (
    <Modal
      className="shared-custom-modal signup-terms-modal"
      width="96%"
      style={{ maxWidth: '842px' }}
      title={modalTitle}
      open={modalOpened}
      onOk={() => {
        setModalOpened(false);
      }}
      onCancel={() => {
        setModalOpened(false);
      }}
      footer={false}
    >
      {isLoadingData ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '322px'
          }}
        >
          <LoadingOutlined />
        </div>
      ) : (
        <p>{modalData || ''}</p>
      )}
    </Modal>
  );
};

export default TermsModal;
