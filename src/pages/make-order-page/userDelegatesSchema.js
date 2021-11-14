import * as Yup from 'yup';

const schema = (t) =>
  Yup.object().shape({
    address: Yup.string().required(
      t('make_order_form.address.errors.required')
    ),
    city: Yup.string().required(t('make_order_form.city.errors.required')),
    area: Yup.string().required(t('make_order_form.area.errors.required')),
    paymentMethod: Yup.string().required(
      t('make_order_form.payment_method.errors.required')
    )
  });

const makeOrderSchema = (t) => {
  return schema(t);
};

export default makeOrderSchema;
