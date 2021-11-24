import * as Yup from 'yup';

const schema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('start_selling_form.name.errors.required')),
    nameOfStore: Yup.string().required(
      t('start_selling_form.nameOfStore.errors.required')
    ),
    phone: Yup.string()
      .required(t('start_selling_form.phone.errors.required'))
      .matches(/^[0-9]+$/, t('start_selling_form.phone.errors.type_error'))
      .min(
        10,
        t('start_selling_form.phone.errors.min', {
          min: 10
        })
      ),
    store_whatsapp: Yup.string()
      .required(t('start_selling_form.store_whatsapp.errors.required'))
      .matches(
        /^[0-9]+$/,
        t('start_selling_form.store_whatsapp.errors.type_error')
      )
      .min(
        10,
        t('start_selling_form.store_whatsapp.errors.min', {
          min: 10
        })
      ),
    email: Yup.string()
      .required(t('start_selling_form.email.errors.required'))
      .email(t('start_selling_form.email.errors.type_error')),
    password: Yup.string()
      .required(t('start_selling_form.password.errors.required'))
      .min(
        6,
        t('start_selling_form.password.errors.min', {
          min: 10
        })
      ),
    password_confirmation: Yup.string()
      .required(t('start_selling_form.password_confirmation.errors.required'))
      .oneOf(
        [Yup.ref('password')],
        t('start_selling_form.password_confirmation.errors.type_error')
      ),
    address: Yup.string().required(
      t('start_selling_form.address.errors.required')
    )
  });

const startSellingSchema = (t) => {
  return schema(t);
};

export default startSellingSchema;
