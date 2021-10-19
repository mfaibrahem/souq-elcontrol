import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Form } from 'antd';
import routerLinks from '../../components/app/routerLinks';
import CustomSharedBtn from '../../common/custom-shared-button/CustomSharedBtn';
import { useHistory } from 'react-router-dom';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import './ContactUsForm.scss';
import { useTranslation } from 'react-i18next';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';

const ContactUsForm = () => {
  const { t } = useTranslation();
  const schema = Yup.object().shape({
    name: Yup.string().required(
      t('contact_section.contact_form.name.errors.required')
    ),
    email: Yup.string()
      .required(t('contact_section.contact_form.email_address.errors.required'))
      .email(t('contact_section.contact_form.email_address.errors.type_error')),
    message: Yup.string().required(
      t('contact_section.contact_form.msg_desc.errors.required')
    )
  });
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      message: ''
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
      className="contact-us-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">
            {t('contact_section.contact_form.name.label')}
          </p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="name"
              type="text"
              placeholder={t('contact_section.contact_form.name.label')}
              errorMsg={errors?.name?.message}
              validateStatus={errors?.name ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
        <div className="text-field-label-wrap">
          <p className="label-p">
            {t('contact_section.contact_form.email_address.label')}
          </p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="email"
              type="text"
              placeholder={t(
                'contact_section.contact_form.email_address.label'
              )}
              errorMsg={errors?.email?.message}
              validateStatus={errors?.email ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
        <div className="text-field-label-wrap">
          <p className="label-p">
            {t('contact_section.contact_form.msg_desc.label')}
          </p>
          <div className="text-field-wrap">
            <AntdTextarea
              rows={5}
              className="form-text-area"
              name="message"
              type="text"
              placeholder={t('contact_section.contact_form.msg_desc.label')}
              errorMsg={errors?.message?.message}
              validateStatus={errors?.message ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        <CustomSharedBtn
          loading={isSubmitting}
          className="submit-btn"
          type="submit"
          isButton
        >
          <span>{t('contact_us_section.contact_form.send_btn')}</span>
        </CustomSharedBtn>
      </div>
    </Form>
  );
};

export default ContactUsForm;
