import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/user-context/UserProvider';
import errorNotification from '../../utils/errorNotification';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import { useHistory } from 'react-router-dom';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import signupApi from '../../apis/auth/signupApi';
import './SignupForm.scss';
import AntdCheckbox from '../../common/antd-form-components/AntdCheckbox';
import routerLinks from '../../components/app/routerLinks';
// import useFirebaseDeviceToken from '../../custom-hooks/useFirebaseDeviceToken';

const SignupForm = () => {
  const history = useHistory();
  const { i18n, t } = useTranslation();
  const { setCurrentUser, setUserToState } = useContext(UserContext);
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
      .matches(/^[0-9]+$/, generalTypeErrorStr('phone'))
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
  console.log('watch :, ', watch());
  const onSubmit = async (data) => {
    try {
      const res = await signupApi(
        {
          name: data?.name,
          phone: data?.phone,
          email: data?.email,
          password: data?.password
        },
        i18n.language
      );
      console.log('res : ', res);
      if (checkRes(res)) {
        setCurrentUser(res.data.data);
        successNotification({
          title: 'العملية تمت بنجاح',
          message: 'تم تسجيل الدخول بنجاح'
        });
        if (data.remember) {
          setCurrentUser({
            ...res?.data?.data,
            information: null,
            categories: null
          });
        } else {
          setUserToState({ ...res?.data?.data });
        }

        history.push(routerLinks.homePage);
      } else {
        errorNotification({
          title: 'حدث خطأ اثناء الدخول',
          message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();
  return (
    <>
      <Form
        className="signup-form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <div className="form-header">
          <p className="bold-font main-title">
            {t('breadcrumb_section.signup')}
          </p>
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
          <AntdTextField
            name="phone"
            type="text"
            placeholder={generalLabelStr('phone')}
            label={generalLabelStr('phone')}
            errorMsg={errors?.phone?.message}
            validateStatus={errors?.phone ? 'error' : ''}
            prefix={<PhoneOutlined />}
            control={control}
          />

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
            loading={isSubmitting}
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
