/* eslint-disable react-hooks/exhaustive-deps */
import { MailOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { forgetPasswordEnterEmailApi } from '../../apis/auth/forgetPassApis';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
import errorNotification from '../../utils/errorNotification';
import successNotification from '../../utils/successNotification';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('من فضلك ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح')
});

const ForgetPasswordFormEnterEmail = () => {
  const { t } = useTranslation();
  const {
    setForgetPasswordFormEnterEmailAppended,
    setForgetPasswordFormEnterCodeAppended,
    setUser
  } = useContext(ForgetPasswordContext);
  const {
    control,
    handleSubmit,
    reset,
    // watch,
    formState: { errors }
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
  const [isLoading, setIsLoading] = React.useState(false);
  const customApiRequest = useCustomApiRequest();
  const onSubmit = (data) => {
    setIsLoading(true);
    customApiRequest(
      forgetPasswordEnterEmailApi(data),
      (res) => {
        setIsLoading(false);
        if (checkRes(res)) {
          successNotification({
            title: t('success_title'),
            message: res?.data?.message || 'تم ارسال ايميل بالكود'
          });
          setForgetPasswordFormEnterEmailAppended(false);
          setForgetPasswordFormEnterCodeAppended(true);
          setUser(res?.data?.data);
        } else {
          errorNotification({
            title: t('error_title'),
            message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
          });
        }
      },
      (error) => {
        setIsLoading(false);
        errorNotification({
          title: t('error_title'),
          message: error?.response?.data?.message || 'حاول فى وقت لاحق'
        });
      }
    );
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
          loading={isLoading}
        >
          أرســـل
        </Button>
      </div>
    </Form>
  );
};

export default ForgetPasswordFormEnterEmail;
