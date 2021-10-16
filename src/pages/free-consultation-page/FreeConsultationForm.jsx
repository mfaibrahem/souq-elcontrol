import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Button, Form } from 'antd';
import './FreeConsultationForm.scss';
import AntdRadioGroup from '../../common/antd-form-components/AntdRadioGroup';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';
import useCategories from '../../custom-hooks/useCategories';
import sendContactsApi from '../../apis/contacts/sendContactsApi';
import errorNotification from '../../utils/errorNotification';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';

const schema = Yup.object().shape({
  name: Yup.string().required('من فضلك ادخل الاســـم'),
  phone: Yup.string()
    .required('ادخل رقم الهاتف')
    .matches(/^[0-9]+$/, 'لا يسمح الا بكتابة الارقام'),
  email: Yup.string()
    .required('من فضلك ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح'),
  category_id: Yup.string().required('من فضلك اختار نوع الاستفسار'),
  message: Yup.string().required('من فضلك ادخل نص الاستفسار')
});

const FreeConsultationForm = () => {
  const allCategories = useCategories();
  const {
    control,
    handleSubmit,
    reset,
    // watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      category_id: '',
      message: ''
    }
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    data.name && formData.append('name', data.name);
    data.phone && formData.append('phone', data.phone);
    data.email && formData.append('email', data.email);
    data.category_id && formData.append('category_id', data.category_id);
    data.message && formData.append('message', data.message);
    try {
      const res = await sendContactsApi(formData);
      if (checkRes(res)) {
        successNotification({
          title: 'العملية تمت بنجاح',
          message: 'تم ارسال الرسالة بنجاح'
        });
        reset({
          name: '',
          phone: '',
          email: '',
          category_id: '',
          message: ''
        });
      } else
        errorNotification({
          title: 'حدث خطأ اثناء الدخول',
          message: res?.data?.message || 'البيانات المدخلة غير صحيحة'
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();
  return (
    <Form
      className="free-consultation-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">الإســــم</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="name"
              type="text"
              placeholder="الإســــم..."
              errorMsg={errors?.name?.message}
              validateStatus={errors?.name ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
        <div className="text-field-label-wrap">
          <p className="label-p">رقم الهاتف</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="phone"
              type="text"
              placeholder="رقم الهاتف..."
              errorMsg={errors?.phone?.message}
              validateStatus={errors?.phone ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
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
            />
          </div>
        </div>

        <AntdRadioGroup
          name="category_id"
          className="form-radio-group"
          control={control}
          label="اختار نوع الإستفسار"
          validateStatus={errors?.category_id ? 'error' : ''}
          errorMsg={errors?.category_id?.message}
          radios={
            allCategories?.length > 0 &&
            allCategories.map((cat) => ({
              title: cat.name,
              value: String(cat.id)
            }))
          }
          // isRadioButton
        />

        <div className="text-field-label-wrap">
          <p className="label-p">التفاصـــيل</p>
          <div className="text-field-wrap">
            <AntdTextarea
              className="form-text-area"
              name="message"
              rows={8}
              placeholder="التفاصـــيل..."
              errorMsg={errors?.message?.message}
              validateStatus={errors?.message ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        {/* <AntdCheckbox name="remember" label="تذكرنى" control={control} /> */}
        <Button
          className="submit-btn"
          htmlType="submit"
          type="primary"
          // icon={<LoginOutlined />}
          loading={isSubmitting}
        >
          أرســــل
        </Button>
      </div>
    </Form>
  );
};

export default FreeConsultationForm;
