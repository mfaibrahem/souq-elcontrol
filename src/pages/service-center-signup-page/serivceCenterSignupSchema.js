/* eslint-disable eqeqeq */
import * as Yup from 'yup';

const sharedRequiredErrTrans = (t, key) =>
  t(`service_center_form.${key}.errors.required`);

const schema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('service_center_form.name.errors.required')),

    phone: Yup.string()
      .required(sharedRequiredErrTrans(t, 'phone'))
      // .matches(/^[0-9]+$/, t('service_center_form.phone.errors.type_error'))
      .min(
        10,
        t('service_center_form.phone.errors.min', {
          min: 10
        })
      ),
    store_whatsapp: Yup.string()
      .required(sharedRequiredErrTrans(t, 'store_whatsapp'))
      // .matches(
      //   /^[0-9]+$/,
      //   t('service_center_form.store_whatsapp.errors.type_error')
      // )
      .min(
        10,
        t('service_center_form.store_whatsapp.errors.min', {
          min: 10
        })
      ),
    email: Yup.string()
      .required(t('service_center_form.email.errors.required'))
      .email(t('service_center_form.email.errors.type_error')),
    password: Yup.string()
      .required(t('service_center_form.password.errors.required'))
      .min(
        6,
        t('service_center_form.password.errors.min', {
          min: 10
        })
      ),
    password_confirmation: Yup.string()
      .required(t('service_center_form.password_confirmation.errors.required'))
      .oneOf(
        [Yup.ref('password')],
        t('service_center_form.password_confirmation.errors.type_error')
      ),
    address: Yup.string().required(
      t('service_center_form.address.errors.required')
    ),
    managerName: Yup.string().required(
      t('service_center_form.managerName.errors.required')
    ),
    managerPhone: Yup.string()
      .required(sharedRequiredErrTrans(t, 'managerPhone'))
      // .matches(
      //   /^[0-9]+$/,
      //   t('service_center_form.managerPhone.errors.type_error')
      // )
      .min(
        10,
        t('service_center_form.managerPhone.errors.min', {
          min: 10
        })
      ),
    managerWhatsapp: Yup.string()
      .required(sharedRequiredErrTrans(t, 'managerWhatsapp'))
      // .matches(
      //   /^[0-9]+$/,
      //   t('service_center_form.managerWhatsapp.errors.type_error')
      // )
      .min(
        10,
        t('service_center_form.managerWhatsapp.errors.min', {
          min: 10
        })
      ),
    emergencyStatus: Yup.mixed().required(
      sharedRequiredErrTrans(t, 'emergencyStatus')
    ),
    city_id: Yup.string().required(sharedRequiredErrTrans(t, 'city')),
    services: Yup.string().required(sharedRequiredErrTrans(t, 'services')),
    workTimes: Yup.array().of(
      Yup.object().shape({
        day: Yup.string()
          .test(
            'workTimes.index.day',
            sharedRequiredErrTrans(t, 'day'),
            (v, context) => {
              let result = true;
              if (!v) result = false;
              return result;
            }
          )
          .test(
            'workTimes.index.day',
            t('service_center_form.day.errors.notTheSame'),
            (v, context) => {
              let result = true;
              if (
                v &&
                context.from[1]?.value?.workTimes?.length > 0 &&
                context.from[1].value.workTimes.filter((obj) => obj.day == v)
                  ?.length > 1
              ) {
                result = false;
              }
              return result;
            }
          ),
        time: Yup.string().test(
          'workTimes.index.time',
          sharedRequiredErrTrans(t, 'time'),
          (v, context) => {
            let result = true;
            if (!v) result = false;
            return result;
          }
        )
      })
    )
  });

const serviceCenterSignupFormSchema = (t) => {
  return schema(t);
};

export default serviceCenterSignupFormSchema;
