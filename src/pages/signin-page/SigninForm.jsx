import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import ForgetPasswordModal from './ForgetPasswordModal';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import useSigninEmailPassword from '../../custom-hooks/useSigninEmailPassword';
import routerLinks from '../../components/app/routerLinks';
import AntdCheckbox from '../../common/antd-form-components/AntdCheckbox';
import './SigninForm.scss';
// import useFirebaseDeviceToken from '../../custom-hooks/useFirebaseDeviceToken';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('من فضلك ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح'),
  password: Yup.string().required('من فضلك ادخل كلمة المرور')
});

const SigninForm = () => {
  const { t } = useTranslation();
  const [passwrodVisible, setPasswordVisible] = React.useState(false);
  const { forgetPasswordModalOpened, setForgetPasswordModalOpened } =
    useContext(ForgetPasswordContext);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      remember: true
    }
  });

  const { signMeInWithEmailPassword, isLoadingSignin } =
    useSigninEmailPassword();
  const onSubmit = (data) => {
    signMeInWithEmailPassword(data);
  };

  const [form] = Form.useForm();
  return (
    <>
      <Form
        className="signin-form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <p className="bold-font main-title">تسجيل الدخول</p>
          {/* <p className="sub-title">سجل دخولك الان لاتمام طلباتك</p> */}
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              gap: '4px',
              justifyContent: 'center',
              margin: '0 12px',
              fontSize: 18
            }}
          >
            <span>ليس لديك حساب قم بإنشاء </span>{' '}
            <RouterLink to={routerLinks?.signupPage}>حساب جديد</RouterLink>
          </div>
        </div>

        <div className="form-body">
          <AntdTextField
            name="email"
            type="text"
            placeholder={'البريد الالكترونى...'}
            // label="الاســــم"
            errorMsg={errors?.email?.message}
            validateStatus={errors?.email ? 'error' : ''}
            prefix={<UserOutlined />}
            control={control}
          />

          <div className="login-password-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="password"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder="كلمة المرور..."
              errorMsg={errors?.password?.message}
              prefix={<LockOutlined />}
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
                {passwrodVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
              </div>
            )}
          </div>
          <p
            className="forget-p"
            style={{ cursor: 'pointer' }}
            onClick={() => setForgetPasswordModalOpened(true)}
          >
            هل نسيت كلمة المرور؟
          </p>
          <AntdCheckbox
            name="remember"
            control={control}
            label={t('signup_form.remember_me')}
            errorMsg={errors?.remember?.message}
            validateStatus={errors?.remember ? 'error' : ''}
          />
          {/* <AntdCheckbox name="remember" label="تذكرنى" control={control} /> */}
          <Button
            className="submit-btn"
            htmlType="submit"
            type="primary"
            // icon={<LoginOutlined />}
            loading={isLoadingSignin}
          >
            {isSubmitting
              ? t('signin_form.submit_btn.loading')
              : t('signin_form.submit_btn.label')}
          </Button>
        </div>
      </Form>

      {forgetPasswordModalOpened && <ForgetPasswordModal />}
    </>
  );
};

export default SigninForm;
