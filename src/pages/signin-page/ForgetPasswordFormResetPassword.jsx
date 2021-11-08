/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import errorNotification from '../../utils/errorNotification';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import { forgetPasswordResetPasswordApi } from '../../apis/auth/forgetPassApis';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';

const schema = Yup.object().shape({
  password: Yup.string().required('أدخل كلمة المرور الجديدة'),
  password_confirm: Yup.string()
    .required('اعد كلمة المرور')
    .oneOf([Yup.ref('password')], 'كلمة المرور غير مطابقة')
});

const ForgetPasswordFormResetPassword = () => {
  const { setForgetPasswordModalOpened, user, resetContext } = useContext(
    ForgetPasswordContext
  );
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      password: '',
      password_confirm: ''
    }
  });

  React.useEffect(() => {
    return () => {
      reset({ email: '' });
    };
  }, []);
  const [passwrodVisible, setPasswordVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const customApiRequest = useCustomApiRequest();
  const onSubmit = (data) => {
    setIsLoading(true);
    customApiRequest(
      forgetPasswordResetPasswordApi(user?.token, data),
      (res) => {
        setIsLoading(false);
        if (checkRes(res)) {
          successNotification({
            title: 'العملية تمت بنجاح',
            message: 'تم تغيير كلمة المرور بنجاح'
          });
          setForgetPasswordModalOpened(false);
          resetContext();
          reset({
            password: '',
            password_confirm: ''
          });
        } else {
          errorNotification({
            title: 'حدث خطأ اثناء العملية',
            message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
          });
        }
      },
      (error) => {
        setIsLoading(false);
        errorNotification({
          title: 'حدث خطأ اثناء العملية',
          message: error?.response?.data?.message || 'حاول فى وقت لاحق'
        });
      }
    );
  };

  const [form] = Form.useForm();

  return (
    <Form
      className="create-product-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">كلمة المرور الجديدة</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="password"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder="كلمة المرور الجديدة..."
              errorMsg={errors?.password?.message}
              validateStatus={errors?.password ? 'error' : ''}
              control={control}
            />
            {watch('password') && (
              <div
                className="eye-icon-btn"
                onClick={() => {
                  setPasswordVisible((prevState) => !prevState);
                }}
              >
                {passwrodVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            )}
          </div>
        </div>
        <div className="text-field-label-wrap">
          <p className="label-p">أعد كلمة المرور الجديدة</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="password_confirm"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder="أعد كلمة المرور الجديدة..."
              errorMsg={errors?.password_confirm?.message}
              validateStatus={errors?.password_confirm ? 'error' : ''}
              control={control}
            />
            {watch('password_confirm') && (
              <div
                className="eye-icon-btn"
                onClick={() => {
                  setPasswordVisible((prevState) => !prevState);
                }}
              >
                {passwrodVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            )}
          </div>
        </div>

        <Button
          className="submit-btn"
          htmlType="submit"
          type="primary"
          // icon={<LoginOutlined />}
          loading={isLoading}
        >
          تعديل
        </Button>
      </div>
    </Form>
  );
};

export default ForgetPasswordFormResetPassword;
