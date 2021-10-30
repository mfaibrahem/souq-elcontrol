import React, { useContext } from 'react';
import { Modal } from 'antd';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import ForgetPasswordForm1 from './ForgetPasswordForm1';
import ForgetPasswordForm2 from './ForgetPasswordForm2';
import ForgetPasswordForm3 from './ForgetPasswordForm3';
import './pageModal.scss';

const ForgetPasswordModal = () => {
  const {
    forgetPasswordModalOpened,
    setForgetPasswordModalOpened,
    forgetPasswordForm1Appended,
    forgetPasswordForm2Appended,
    forgetPasswordForm3Appended
  } = useContext(ForgetPasswordContext);
  return (
    <Modal
      className="forget-password-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '642px' }}
      title="هل نسيت كلمة المرور؟"
      visible={forgetPasswordModalOpened}
      onOk={() => {
        setForgetPasswordModalOpened(false);
      }}
      onCancel={() => {
        setForgetPasswordModalOpened(false);
      }}
      footer={false}
    >
      {forgetPasswordForm1Appended && <ForgetPasswordForm1 />}
      {forgetPasswordForm2Appended && <ForgetPasswordForm2 />}
      {forgetPasswordForm3Appended && <ForgetPasswordForm3 />}
    </Modal>
  );
};

export default ForgetPasswordModal;
