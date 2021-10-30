import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/user-context/UserProvider';
import ForgetPasswordModal from './ForgetPasswordModal';
import errorNotification from '../../utils/errorNotification';
import ForgetPasswordContext from '../../contexts/forget-password-context/ForgetPasswordContext';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.scss';
import signinApi from '../../apis/auth/signinApi';
// import useFirebaseDeviceToken from '../../custom-hooks/useFirebaseDeviceToken';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('من فضلك ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح'),
  password: Yup.string().required('من فضلك ادخل كلمة المرور')
});

const SigninForm = () => {
  const { i18n, t } = useTranslation();
  const { setCurrentUser, setUserToState } = useContext(UserContext);
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

  const onSubmit = async (data) => {
    try {
      const res = await signinApi(
        {
          ...data
        },
        i18n.language
      );
      if (res?.status === 200 && !res?.data?.success) {
        errorNotification({
          title: 'حدث خطأ اثناء الدخول',
          message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
        });
      } else if (checkRes(res)) {
        if (res?.data?.data?.status === 1) {
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
        } else {
          errorNotification({
            title: 'حدث خطأ',
            message: 'المستخدم غير مفعل'
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
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
          <p className="sub-title">سجل دخولك الان للوحة التحكم الخاصة بك</p>
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
          {/* <AntdCheckbox name="remember" label="تذكرنى" control={control} /> */}
          <Button
            className="submit-btn"
            htmlType="submit"
            type="primary"
            // icon={<LoginOutlined />}
            loading={isSubmitting}
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
