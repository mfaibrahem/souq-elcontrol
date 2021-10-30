/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { MailOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { forgetPasswordApi1 } from '../../apis/auth/forgetPassApis';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('من فضلك ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح')
});

const ForgetPasswordForm1 = () => {
  const {
    setForgetPasswordForm1Appended,
    setForgetPasswordForm2Appended,
    setUserEmail
  } = useContext(ForgetPasswordContext);
  const {
    control,
    handleSubmit,
    reset,
    // watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: ''
    }
  });

  React.useEffect(() => {
    return () => {
      reset({ email: '' });
    };
  }, []);
  const onSubmit = async (data) => {
    try {
      const res = await forgetPasswordApi1(data);
      if (checkRes(res)) {
        successNotification({
          title: 'العملية تمت بنجاح',
          message: res?.data?.message || 'تم ارسال ايميل بالكود'
        });
        setForgetPasswordForm1Appended(false);
        setForgetPasswordForm2Appended(true);
        setUserEmail(data?.email);
      } else {
        errorNotification({
          title: 'حدث خطأ',
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
      className="custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">البريد الاكترونى</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="email"
              type="text"
              placeholder="البريد الاكترونى..."
              errorMsg={errors?.email?.message}
              validateStatus={errors?.email ? 'error' : ''}
              control={control}
              prefix={<MailOutlined />}
            />
          </div>
        </div>

        {/* <AntdCheckbox name="remember" label="تذكرنى" control={control} /> */}
        <Button
          className="submit-btn"
          htmlType="submit"
          type="primary"
          // icon={<LoginOutlined />}
          loading={isSubmitting}
        >
          أرســـل
        </Button>
      </div>
    </Form>
  );
};

export default ForgetPasswordForm1;
