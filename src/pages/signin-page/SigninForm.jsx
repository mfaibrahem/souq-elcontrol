import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import ForgetPasswordModal from './ForgetPasswordModal';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import { LockOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import useSigninEmailPassword from '../../custom-hooks/useSigninEmailPassword';
import routerLinks from '../../components/app/routerLinks';
import AntdCheckbox from '../../common/antd-form-components/AntdCheckbox';
import './SigninForm.scss';
import PhoneInput from 'react-phone-number-input';
// import useFirebaseDeviceToken from '../../custom-hooks/useFirebaseDeviceToken';

const SigninForm = () => {
  const { t, i18n } = useTranslation();
  const [passwrodVisible, setPasswordVisible] = React.useState(false);
  const { forgetPasswordModalOpened, setForgetPasswordModalOpened } =
    useContext(ForgetPasswordContext);
  const schema = Yup.object().shape({
    // loginKey: Yup.string()
    //   .required('من فضلك ادخل البريد الاكترونى')
    //   .email('ادخل بريد الكترونى صحيح'),
    loginKey: Yup.string().required(t('signin_form.login_key.errors.required')),
    password: Yup.string().required(t('signin_form.password.errors.required'))
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      loginKey: '',
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
        className="signin-form custom-shared-form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <p className="bold-font main-title">{t('signin_form.title')}</p>
          {/* <p className="sub-title">سجل دخولك الان لاتمام طلباتك</p> */}
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              gap: '6px',
              justifyContent: 'center',
              margin: '0 12px',
              alignItems: 'center'
            }}
          >
            <span>{t('signin_form.dont')}</span>{' '}
            <RouterLink to={routerLinks?.signupPage}>
              {t('signin_form.new_account')}
            </RouterLink>
          </div>
        </div>

        <div className="form-body">
          {/* <AntdTextField
            className="form-text-field"
            name="loginKey"
            type="text"
            placeholder={t('signin_form.login_key.label')}
            label={t('signin_form.login_key.label')}
            errorMsg={errors?.loginKey?.message}
            validateStatus={errors?.loginKey ? 'error' : ''}
            prefix={<UserOutlined />}
            control={control}
          /> */}

          <div
            className="country-code-phone-wrap"
            style={{
              marginBottom: 28
            }}
          >
            <p
              style={{
                paddingBottom: 8
              }}
            >
              {t('signin_form.login_key.label')}
            </p>
            <Controller
              name="loginKey"
              control={control}
              // render={({ field: { onChange, onBlur, value, name, ref } }) => {
              render={({ field }) => {
                return (
                  <PhoneInput
                    {...field}
                    placeholder={t('signin_form.login_key.label')}
                    // value={phoneValue}
                    // onChange={setPhoneValue}
                    defaultCountry="EG"
                    className={`custom-phone-input ${i18n.dir()}`}
                  />
                );
              }}
            />
            <p className="error-p">{errors?.loginKey?.message}</p>
          </div>

          <div className="login-password-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="password"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder={t('signin_form.password.label')}
              label={t('signin_form.password.label')}
              errorMsg={errors?.password?.message}
              prefix={<LockOutlined />}
              validateStatus={errors?.password ? 'error' : ''}
              control={control}
            />

            {watch('password') && (
              <div
                className="eye-icon-btn"
                style={{
                  left: i18n.dir() === 'rtl' ? '14px' : 'auto',
                  right: i18n.dir() === 'ltr' ? '14px' : 'auto'
                }}
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
            {t('signin_form.forget_pass')}
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
