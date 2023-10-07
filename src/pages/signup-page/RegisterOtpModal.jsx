import React, { useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import UserContext from '../../contexts/user-context/UserProvider';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import useDigitInput from 'react-digit-input';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import routerLinks from '../../components/app/routerLinks';
import { useHistory } from 'react-router-dom';
import { registerCheckActiveCode } from '../../apis/auth/signupApi';
import { forgetPasswordResendCodeApi } from '../../apis/auth/forgetPassApis';



const btnTypes = {
  confirmCode: 1,
  resendCode: 2
};
const RegisterOtpModal = () => {
  const history = useHistory();
  const { setUser, user } = useContext(ForgetPasswordContext);
  const { setCurrentUser } = useContext(UserContext);
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
    otpModalOpened,
    setOtpModalOpened
  } = useContext(UserContext);

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
        registerCheckActiveCode(user?.token, {
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
              message: res?.data?.message || 'الكود صحيح'
            });
            setCurrentUser(user)
            setUser(null)
            history.push(routerLinks?.homePage);
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
        check: 1 // 1 => in active user registeration resend code, 2 => in foreget password resend code
      }),
      (res) => {
        setIsLoadingState({
          type: btnTypes.resendCode,
          isLoading: false
        });
        if (checkRes(res)) {
          successNotification({
            title: 'العملية تمت بنجاح',
            message: res?.data?.message || 'تم ارسال الكــود'
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
    <Modal
      className="otp-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '442px' }}
      title="ادخل كــود التأكــيد"
      open={otpModalOpened}
      onOk={() => {
        setOtpModalOpened(false);
      }}
      onCancel={() => {
        setOtpModalOpened(false);
      }}
      footer={false}
    >
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

    </Modal>
  );
};

export default RegisterOtpModal;
