import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Form } from 'antd';
import CustomSharedBtn from '../../common/custom-shared-button/CustomSharedBtn';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import { useTranslation } from 'react-i18next';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import './ContactUsForm.scss';
import contactUsApi from '../../apis/contact-us/contactUsApi';

const ContactUsForm = () => {
  const { t, i18n } = useTranslation();
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

  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });
  const customApiRequest = useCustomApiRequest();
  const onSubmit = (data) => {
    setIsSubmittingForm(true);
    customApiRequest(
      contactUsApi(data, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
          reset({
            name: '',
            email: '',
            message: ''
          });
          successNotification({
            title: 'Operation done successfully',
            message: res?.data?.message || 'تم إرسال الرسالة بنجاح'
          });
        } else {
          errorNotification({
            tite: 'Something went wrong',
            message: res?.data?.message || 'Try again later'
          });
        }
      },
      (error) => {
        setIsSubmittingForm(false);
        errorNotification({
          title: 'Something went wrong',
          message: error?.response?.data?.message || 'حاول فى وقت لاحق'
        });
      }
    );
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
          loading={isSubmittingForm}
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
