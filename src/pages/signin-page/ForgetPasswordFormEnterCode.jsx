import React, { useState, useContext } from 'react';
import { Button } from 'antd';
import useDigitInput from 'react-digit-input';
import {
  forgetPasswordEnterCodeApi,
  forgetPasswordResendCodeApi
} from '../../apis/auth/forgetPassApis';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import errorNotification from '../../utils/errorNotification';
import './ForgetPassword.scss';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';

const btnTypes = {
  confirmCode: 1,
  resendCode: 2
};
const ForgetPasswordFormEnterCode = () => {
  const [submitCodeCount, setSubmitCodeCount] = React.useState(0);
  const [value, onChange] = React.useState('');
  const [err, setErr] = useState('');
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 4,
    value,
    onChange
  });

  const {
    setForgetPasswordFormEnterEmailAppended,
    setForgetPasswordFormEnterCodeAppended,
    setForgetPasswordFormResetPasswordAppended,
    user
  } = useContext(ForgetPasswordContext);
  React.useEffect(() => {
    return () => {
      onChange('');
    };
  }, []);
  const [isLoadingState, setIsLoadingState] = React.useState({
    type: '',
    isLoading: false
  });

  const customApiRequest = useCustomApiRequest();
  const onSubmit = (e) => {
    e.preventDefault();
    if (value?.trim().length === 4) {
      setErr('');
      setIsLoadingState({
        type: btnTypes.confirmCode,
        isLoading: true
      });
      customApiRequest(
        forgetPasswordEnterCodeApi(user?.token, {
          code: value
        }),
        (res) => {
          setIsLoadingState({
            type: btnTypes.confirmCode,
            isLoading: false
          });
          if (checkRes(res)) {
            successNotification({
              title: 'العملية تمت بنجاح',
              message: res?.data?.message || 'الكود المرسل صحيح'
            });
            setForgetPasswordFormEnterEmailAppended(false);
            setForgetPasswordFormEnterCodeAppended(false);
            setForgetPasswordFormResetPasswordAppended(true);
          } else {
            setSubmitCodeCount((prev) => prev + 1);
            errorNotification({
              title: 'حدث خطأ',
              message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
            });
          }
        },
        (error) => {
          setIsLoadingState({
            type: btnTypes.confirmCode,
            isLoading: false
          });
          setSubmitCodeCount((prev) => prev + 1);
          errorNotification({
            title: 'حدث خطأ',
            message:
              error?.response?.data?.message || 'البيانات المدخلة غير صحيحة'
          });
        }
      );
    } else {
      setErr('الكود غير صحيح');
    }
  };
  const onResendCode = () => {
    setIsLoadingState({
      type: btnTypes.resendCode,
      isLoading: true
    });
    customApiRequest(
      forgetPasswordResendCodeApi(user?.token, {
        check: 2 // 1 => in active user registeration resend code, 2 => in foreget password resend code
      }),
      (res) => {
        setIsLoadingState({
          type: btnTypes.resendCode,
          isLoading: false
        });
        if (checkRes(res)) {
          successNotification({
            title: 'العملية تمت بنجاح',
            message: res?.data?.message || 'تم ارسال ايميل بالكود'
          });
        } else {
          errorNotification({
            title: 'حدث خطأ',
            message: res?.data?.message || '1حاول فى وقت لاحق'
          });
        }
      },
      (error) => {
        setIsLoadingState({
          type: btnTypes.resendCode,
          isLoading: false
        });
        errorNotification({
          title: 'حدث خطأ',
          message: error?.response?.data?.message || '2حاول فى وقت لاحق'
        });
      }
    );
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

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 22
        }}
      >
        <Button
          className="submit-btn"
          htmlType="submit"
          type="primary"
          // icon={<LoginOutlined />}
          loading={
            isLoadingState?.type === btnTypes.confirmCode &&
            isLoadingState?.isLoading
          }
        >
          تأكيد الكود
        </Button>
        {submitCodeCount > 0 && (
          <Button
            className="submit-btn"
            htmlType="button"
            type="primary"
            // icon={<LoginOutlined />}
            loading={
              isLoadingState?.type === btnTypes.resendCode &&
              isLoadingState?.isLoading
            }
            onClick={onResendCode}
          >
            إعادة الإرســال
          </Button>
        )}
      </div>
    </form>
  );
};

export default ForgetPasswordFormEnterCode;
