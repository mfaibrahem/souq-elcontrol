import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Form } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';
import CustomSharedBtn from '../../common/custom-shared-button/CustomSharedBtn';
import { useHistory } from 'react-router-dom';
import checkRes from '../../utils/checkRes';
import UesrContext from '../../contexts/user-context/UserProvider';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import './ContactUsForm.scss';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  // email: Yup.string()
  //   .required('Please enter your email')
  //   .email('Please enter a valid email'),
  phone: Yup.string()
    .required('ادخل رقم الهاتف')
    .matches(/^[0-9]+$/, 'لا يسمح الا بكتابة الارقام')
    .min(10, 'اقل حد 10 ارقام'),
  password: Yup.string().required('Please enter your Password')
});

const ContactUsForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      phone: '',
      password: ''
    }
  });
  const onSubmit = async (data) => {
    try {
      // const res = await signInEmailPassApi(
      //   {
      //     ...dataToBeSubmitted
      //   },
      //   i18n.language
      // );
      let res;
      if (checkRes(res)) {
        successNotification({
          title: 'العملية تمت بنجاح',
          message: 'تم تسجيل الدخول بنجاح'
        });

        history.push(routerLinks.homePage);
      } else {
        errorNotification({
          title: 'حدث خطأ',
          message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
        });
      }
    } catch (error) {
      console.log('error: ', error);
      errorNotification({
        title: 'حدث خطأ',
        message: error?.message || 'البيانات المدخلة غير صحيحة'
      });
      // errorNotification({
      //   title: 'حدث خطأ',
      //   message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
      // });
    }
  };

  const [form] = Form.useForm();
  return (
    <Form
      className="signin-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">المبــلغ</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="amount"
              type="text"
              placeholder="المبــلغ..."
              errorMsg={errors?.amount?.message}
              validateStatus={errors?.amount ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
        <AntdTextField
          name="password"
          type="password"
          // placeholder={'الرقــم الســرى...'}
          placeholder="Enter your password..."
          label="Password"
          errorMsg={errors?.password?.message}
          validateStatus={errors?.password ? 'error' : ''}
          prefix={<LockOutlined />}
          control={control}
          disabled={isSubmitting}
        />

        <CustomSharedBtn
          loading={isSubmitting}
          className="submit-btn"
          type="submit"
          isButton
        >
          <span className="bold-font">
            {t('contact_us_section.contact_form.send_btn')}
          </span>
        </CustomSharedBtn>
      </div>
    </Form>
  );
};

export default ContactUsForm;
