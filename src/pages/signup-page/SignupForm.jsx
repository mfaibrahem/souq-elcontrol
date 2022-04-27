import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import { Link as RouterLink } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined
  // PhoneOutlined
} from '@ant-design/icons';
import './SignupForm.scss';
import AntdCheckbox from '../../common/antd-form-components/AntdCheckbox';
import routerLinks from '../../components/app/routerLinks';
import useSignupEmailPassword from '../../custom-hooks/useSignupEmailPassowrd';
// import useFirebaseDeviceToken from '../../custom-hooks/useFirebaseDeviceToken';

const SignupForm = () => {
  const { i18n, t } = useTranslation();
  const [passwrodVisible, setPasswordVisible] = React.useState(false);
  useContext(ForgetPasswordContext);
  const generalLabelStr = (v) => t(`signup_form.${v}.label`);
  const generalrequiredErrStr = (v) => t(`signup_form.${v}.errors.required`);
  const generalTypeErrorStr = (v) => t(`signup_form.${v}.errors.type_error`);
  const generalMinErrorStr = (v, min) =>
    t(`signup_form.${v}.errors.min`, {
      min
    });
  const schema = Yup.object().shape({
    name: Yup.string().required(generalrequiredErrStr('name')),
    phone: Yup.string()
      .required(generalrequiredErrStr('phone'))
      // .matches(/^[0-9]+$/, generalTypeErrorStr('phone'))
      .min(10, generalMinErrorStr('phone', 10)),
    email: Yup.string()
      .required(generalrequiredErrStr('email'))
      .email(generalTypeErrorStr('email')),
    password: Yup.string().required(generalrequiredErrStr('password')),
    password_confirmation: Yup.string()
      .required(generalrequiredErrStr('password_confirmation'))
      .oneOf(
        [Yup.ref('password')],
        generalTypeErrorStr('password_confirmation')
      )
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
      name: '',
      phone: '',
      email: '',
      password: '',
      remember: true
    }
  });
  // console.log('watch :, ', watch());
  const { isLoadingSignup, signMeUpWithEmailPassword } =
    useSignupEmailPassword();
  const onSubmit = (data) => {
    signMeUpWithEmailPassword(data);
  };

  const [form] = Form.useForm();
  return (
    <>
      <Form
        className="signup-form custom-shared-form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <p className="bold-font main-title">
            {t('breadcrumb_section.signup')}
          </p>
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
            <span>لديك حساب قم ب </span>{' '}
            <RouterLink to={routerLinks?.signinPage}>تسجيل الدخول</RouterLink>
          </div>
        </div>

        <div className="form-body">
          <AntdTextField
            name="name"
            type="text"
            placeholder={generalLabelStr('name')}
            label={generalLabelStr('name')}
            errorMsg={errors?.name?.message}
            validateStatus={errors?.name ? 'error' : ''}
            prefix={<UserOutlined />}
            control={control}
          />
          <AntdTextField
            name="email"
            type="text"
            placeholder={generalLabelStr('email')}
            label={generalLabelStr('email')}
            errorMsg={errors?.email?.message}
            validateStatus={errors?.email ? 'error' : ''}
            prefix={<MailOutlined />}
            control={control}
          />
          {/* <AntdTextField
            name="phone"
            type="text"
            placeholder={generalLabelStr('phone')}
            label={generalLabelStr('phone')}
            errorMsg={errors?.phone?.message}
            validateStatus={errors?.phone ? 'error' : ''}
            prefix={<PhoneOutlined />}
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
              {generalLabelStr('phone')}
            </p>
            <Controller
              name="phone"
              control={control}
              // render={({ field: { onChange, onBlur, value, name, ref } }) => {
              render={({ field }) => {
                return (
                  <PhoneInput
                    {...field}
                    placeholder={generalLabelStr('phone')}
                    // value={phoneValue}
                    // onChange={setPhoneValue}
                    defaultCountry="EG"
                    className={`custom-phone-input ${i18n.dir()}`}
                  />
                );
              }}
            />
            <p className="error-p">{errors?.phone?.message}</p>
          </div>

          <div className="login-password-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="password"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder={generalLabelStr('password')}
              label={generalLabelStr('password')}
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
          <div className="login-password-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="password_confirmation"
              type={passwrodVisible ? 'text' : 'password'}
              placeholder={generalLabelStr('password_confirmation')}
              label={generalLabelStr('password_confirmation')}
              errorMsg={errors?.password_confirmation?.message}
              prefix={<LockOutlined />}
              validateStatus={errors?.password_confirmation ? 'error' : ''}
              control={control}
            />

            {watch('password_confirmation') && (
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
            loading={isLoadingSignup}
          >
            {isSubmitting
              ? t('signup_form.submit_btn.loading')
              : t('signup_form.submit_btn.label')}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;
