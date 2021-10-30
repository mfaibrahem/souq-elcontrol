import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import useDigitInput from 'react-digit-input';
import { forgetPasswordApi2 } from '../../apis/auth/forgetPassApis';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import errorNotification from '../../utils/errorNotification';
import './ForgetPassword.scss';

const ForgetPasswordForm2 = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, onChange] = React.useState('');
  const [err, setErr] = useState('');
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 4,
    value,
    onChange
  });

  const {
    setForgetPasswordForm1Appended,
    setForgetPasswordForm2Appended,
    setForgetPasswordForm3Appended,
    userEmail
  } = useContext(ForgetPasswordContext);

  React.useEffect(() => {
    return () => {
      onChange('');
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (value?.trim().length === 4) {
      setErr('');
      setIsSubmitting(true);
      try {
        const res = await forgetPasswordApi2({
          token: value,
          email: userEmail
        });
        if (checkRes(res)) {
          successNotification({
            title: 'العملية تمت بنجاح',
            message: res?.data?.message || 'تم ارسال ايميل بالكود'
          });
          setIsSubmitting(false);
          setForgetPasswordForm1Appended(false);
          setForgetPasswordForm2Appended(false);
          setForgetPasswordForm3Appended(true);
        } else {
          setIsSubmitting(false);
          errorNotification({
            title: 'حدث خطأ',
            message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        console.log(error);
      }
    } else {
      setErr('الكود غير صحيح');
    }
  };

  return (
    <form onSubmit={onSubmit} className="forget-pass-digits-form">
      <div className="digits-wrap">
        <input inputMode="decimal" autoFocus {...digits[0]} />
        <input inputMode="decimal" {...digits[1]} />
        <input inputMode="decimal" {...digits[2]} />
        <input inputMode="decimal" {...digits[3]} />
      </div>
      {err && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: 8 }}>{err}</p>
      )}

      <Button
        className="submit-btn"
        htmlType="submit"
        type="primary"
        // icon={<LoginOutlined />}
        loading={isSubmitting}
      >
        أرســـل
      </Button>
    </form>
  );
};

export default ForgetPasswordForm2;
