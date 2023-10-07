import React, { useContext } from 'react';
import { Modal } from 'antd';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import './pageModal.scss';
import ForgetPasswordFormEnterEmail from './ForgetPasswordFormEnterEmail';
import ForgetPasswordFormEnterCode from './ForgetPasswordFormEnterCode';
import ForgetPasswordFormResetPassword from './ForgetPasswordFormResetPassword';

const ForgetPasswordModal = () => {
  const {
    forgetPasswordModalOpened,
    setForgetPasswordModalOpened,
    forgetPasswordFormEnterEmailAppended,
    forgetPasswordFormEnterCodeAppended,
    forgetPasswordFormResetPasswordAppended
  } = useContext(ForgetPasswordContext);
  return (
    <Modal
      className="forget-password-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '442px' }}
      title="هل نسيت كلمة المرور؟"
      open={forgetPasswordModalOpened}
      onOk={() => {
        setForgetPasswordModalOpened(false);
      }}
      onCancel={() => {
        setForgetPasswordModalOpened(false);
      }}
      footer={false}
    >
      {forgetPasswordFormEnterEmailAppended && <ForgetPasswordFormEnterEmail />}
      {forgetPasswordFormEnterCodeAppended && <ForgetPasswordFormEnterCode />}
      {forgetPasswordFormResetPasswordAppended && (
        <ForgetPasswordFormResetPassword />
      )}
    </Modal>
  );
};

export default ForgetPasswordModal;
