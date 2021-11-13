import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('ادخل اسم المندوب'),
  email: Yup.string()
    .required('من فضلك ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح'),
  phone: Yup.string()
    .required('ادخل رقم الهاتف')
    .matches(/^[0-9]+$/, 'لا يسمح الا بكتابة الارقام')
    .min(10, 'اقل حد 10 ارقام'),
  password: Yup.string()
    .min(6, 'كلمة المرور لا تقل عن 6 حروف')
    .required('من فضلك ادخل كلمة المرور'),
  confirm_password: Yup.string()
    .required('اعد كلمة المرور')
    .oneOf([Yup.ref('password')], 'كلمة المرور غير مطابقة'),
  nationality: Yup.string().required('أدخل الجنسية'),
  identity_number: Yup.string()
    .required('أدخل رقم الهوية')
    .matches(/^[0-9]+$/, 'لا يسمح الا بكتابة الارقام')
    .min(10, 'كلمة المرور لا تقل عن 10 حروف'),
  address: Yup.string().required('ادخل العنوان'),
  driving_image: Yup.mixed().required('ادخل صورة القيادة'),
  vehicle_images: Yup.mixed().required('أدخل صورة المركبة'),
  vehicle_registration: Yup.mixed().required('أدخل صورة استمارة المركبة'),
  vehicle_tablet_image: Yup.mixed().required('أدخل صورة لوحة المركبة')
});

const makeOrderSchema = () => {
  return schema;
};

export default makeOrderSchema;
