import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form } from 'antd';
import CustomSharedBtn from '../../common/custom-shared-button/CustomSharedBtn';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import { useTranslation } from 'react-i18next';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import sendSellerMessage from '../../apis/seller-apis/sendSellerMessageApi';
import UserContext from '../../contexts/user-context/UserProvider';
import FileInput from '../../common/file-input/FileInput';
import ContactSellerContext from '../../contexts/contact-seller-context/ContactSellerContext';

const ContactSellerForm = ({ store }) => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const { setModalOpened } = useContext(ContactSellerContext);
  const schema = Yup.object().shape({
    message: Yup.string().required(
      t('contact_section.contact_form.msg_desc.errors.required')
    )
  });

  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    unregister,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      message: '',
      file: null
    }
  });
  const customApiRequest = useCustomApiRequest();
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('message', data.message);
    formData.append('store_id', store?.id);
    if (data.file?.length > 0) {
      formData.append('file', data.file[0]);
    }
    setIsSubmittingForm(true);
    customApiRequest(
      sendSellerMessage(formData, user?.token, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
          reset({
            message: ''
          });
          setModalOpened(false);
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
      className="contact-seller-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
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

        <FileInput
          name="file"
          // label="ارفع ملف الاسئلة المطلوبة"
          label={null}
          // accept="image/png, image/jpg, image/jpeg, image/gif, .pdf"
          accept="image/*, application/*"
          multiple={false}
          setValue={setValue}
          watch={watch}
          register={register}
          unregister={unregister}
          // setUrls={setUrls}
          dropzoneText="اسحب الملف وضعه هنا ..."
          className="product-images-dropzone"
          //  dropzoneUrls={
          //    selectedCategory?.image ? [{ url: selectedCategory.image }] : []
          //  }
          canDelete={false}
        />

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

export default ContactSellerForm;
