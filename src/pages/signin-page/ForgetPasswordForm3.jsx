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
import { forgetPasswordApi3 } from '../../apis/auth/forgetPassApis';

const schema = Yup.object().shape({
  password: Yup.string().required('أدخل كلمة المرور الجديدة'),
  password_confirmation: Yup.string()
    .required('اعد كلمة المرور')
    .oneOf([Yup.ref('password')], 'كلمة المرور غير مطابقة')
});

const ForgetPasswordForm3 = () => {
  const { setForgetPasswordModalOpened, userEmail, resetContext } = useContext(
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
      old_password: '',
      password: '',
      password_confirmation: ''
    }
  });

  React.useEffect(() => {
    return () => {
      reset({ email: '' });
    };
  }, []);
  const [passwrodVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    try {
      const res = await forgetPasswordApi3({
        ...data,
        email: userEmail
      });
      if (checkRes(res)) {
        successNotification({
          title: 'العملية تمت بنجاح',
          message: 'تم تغيير كلمة المرور بنجاح'
        });
        setForgetPasswordModalOpened(false);
        resetContext();
        reset({
          old_password: '',
          password: '',
          password_confirmation: ''
        });
      } else {
        errorNotification({
          title: 'حدث خطأ اثناء العملية',
          message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
        });
      }
    } catch (error) {
      console.log(error);
    }
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
              name="password_confirmation"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder="أعد كلمة المرور الجديدة..."
              errorMsg={errors?.password_confirmation?.message}
              validateStatus={errors?.password_confirmation ? 'error' : ''}
              control={control}
            />
            {watch('password_confirmation') && (
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
          loading={isSubmitting}
        >
          تعديل
        </Button>
      </div>
    </Form>
  );
};

export default ForgetPasswordForm3;
