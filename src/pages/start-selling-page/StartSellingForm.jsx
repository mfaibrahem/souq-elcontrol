/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import checkRes from '../../utils/checkRes';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import CustomMap from '../../components/custom-map/CustomMap';
import { useTranslation } from 'react-i18next';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import startSellingSchema from './startSellingSchema';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import createStoreApi from '../../apis/store-apis/createStoreApi';
import successOrderImg from '../../assets/imgs/icons/success-order.png';
import './StartSellingForm.scss';
import PhoneInput from 'react-phone-number-input';
import LoadingModal from '../../common/loading-modal/LoadingModal';

const StartSellingForm = () => {
  // const [urls, setUrls] = React.useState([]);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { i18n, t } = useTranslation();
  const [selectedLocation, setSelecectedLocation] = React.useState({
    lat: '',
    lng: ''
  });
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [passwrodVisible, setPasswordVisible] = React.useState(false);

  const schema = startSellingSchema(t);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      nameOfStore: '',
      phone: '',
      store_whatsapp: '',
      email: '',
      password: '',
      password_confirmation: '',
      country: '',
      city: '',
      area: '',
      address: '',
      lat: '',
      lng: ''
    }
  });

  // console.log('watch : ', watch());
  // console.log('errors : ', errors);

  const [successOrder, setSuccessOrder] = useState(false);
  const [orderRes, setOrderRes] = useState(null);
  const customApiRequest = useCustomApiRequest();
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.nameOfStore) formData.append('nameOfStore', data.nameOfStore);
    if (data.phone) formData.append('phone', data.phone);
    if (data.store_whatsapp)
      formData.append('store_whatsapp', `+2${data.store_whatsapp}`);
    if (data.email) formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    if (data.password_confirmation)
      formData.append('password_confirmation', data.password_confirmation);
    if (data.country) formData.append('country', data.country);
    if (data.city) formData.append('city', data.city);
    if (data.area) formData.append('area', data.area);
    if (data.address) formData.append('address', data.address);
    formData.append('lat', selectedLocation?.lat ? selectedLocation.lat : '');
    formData.append('lng', selectedLocation?.lng ? selectedLocation.lng : '');

    setIsSubmittingForm(true);
    customApiRequest(
      createStoreApi(formData, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res) && res?.data?.data) {
          reset({
            name: '',
            nameOfStore: '',
            phone: '',
            store_whatsapp: '',
            email: '',
            password: '',
            password_confirmation: '',
            country: '',
            city: '',
            area: '',
            address: '',
            lat: '',
            lng: ''
          });
          setSuccessOrder(true);
          setOrderRes(res.data.data);
          successNotification({
            title: 'Operation done successfully',
            message: 'Order placed successfully'
          });
        } else {
          errorNotification({
            title: 'Something went wrong',
            message: res?.data?.message || 'Please try agin later'
          });
        }
      },
      (error) => {
        setIsSubmittingForm(false);

        errorNotification({
          title: 'Something went wrong',
          message: error?.response?.data?.message || 'try agin later'
        });
      }
    );
  };

  const [form] = Form.useForm();
  return (
    <>
      <Form
        className="start-selling-form custom-shared-form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <div className="form-body">
          <div className="names-wrap">
            <div className="text-field-label-wrap">
              <p className="label-p">{t('start_selling_form.name.label')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="name"
                  type="text"
                  placeholder={t('start_selling_form.name.label')}
                  errorMsg={errors?.name?.message}
                  validateStatus={errors?.name ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
            <div className="text-field-label-wrap">
              <p className="label-p">
                {t('start_selling_form.nameOfStore.label')}
              </p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="nameOfStore"
                  type="text"
                  placeholder={t('start_selling_form.nameOfStore.label')}
                  errorMsg={errors?.nameOfStore?.message}
                  validateStatus={errors?.nameOfStore ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
          </div>
          <div className="phone-email-wrap">
            <div
              className="country-code-phone-wrap"
              style={{
                marginBottom: 28
              }}
            >
              <p
                style={{
                  paddingBottom: 8
                }}
              >
                {t('start_selling_form.phone.label')}
              </p>
              <Controller
                name="phone"
                control={control}
                // render={({ field: { onChange, onBlur, value, name, ref } }) => {
                render={({ field }) => {
                  return (
                    <PhoneInput
                      {...field}
                      placeholder={t('start_selling_form.phone.label')}
                      // value={phoneValue}
                      // onChange={setPhoneValue}
                      defaultCountry="EG"
                      className={`custom-phone-input ${i18n.dir()}`}
                    />
                  );
                }}
              />
              <p className="error-p">{errors?.phone?.message}</p>
            </div>

            <div
              className="country-code-phone-wrap"
              style={{
                marginBottom: 28
              }}
            >
              <p
                style={{
                  paddingBottom: 8
                }}
              >
                {t('start_selling_form.store_whatsapp.label')}
              </p>
              <Controller
                name="store_whatsapp"
                control={control}
                // render={({ field: { onChange, onBlur, value, name, ref } }) => {
                render={({ field }) => {
                  return (
                    <PhoneInput
                      {...field}
                      placeholder={t('start_selling_form.store_whatsapp.label')}
                      // value={phoneValue}
                      // onChange={setPhoneValue}
                      defaultCountry="EG"
                      className={`custom-phone-input ${i18n.dir()}`}
                    />
                  );
                }}
              />
              <p className="error-p">{errors?.store_whatsapp?.message}</p>
            </div>

            <div className="text-field-label-wrap">
              <p className="label-p">{t('start_selling_form.email.label')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="email"
                  type="text"
                  placeholder={t('start_selling_form.email.label')}
                  errorMsg={errors?.email?.message}
                  validateStatus={errors?.email ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
          </div>

          <div className="passwords-wrap">
            <div className="text-field-label-wrap">
              <p className="label-p">
                {t('start_selling_form.password.label')}
              </p>
              <div className="login-password-field-wrap text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="password"
                  type={passwrodVisible ? 'text' : 'password'}
                  placeholder={t('start_selling_form.password.label')}
                  errorMsg={errors?.password?.message}
                  validateStatus={errors?.password ? 'error' : ''}
                  control={control}
                />

                {watch('password') && (
                  <div
                    className="eye-icon-btn"
                    style={{
                      left: i18n.dir() === 'rtl' ? '14px' : 'auto',
                      right: i18n.dir() === 'ltr' ? '14px' : 'auto'
                    }}
                    onClick={() => {
                      setPasswordVisible((prevState) => !prevState);
                    }}
                  >
                    {passwrodVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                  </div>
                )}
              </div>
            </div>
            <div className="text-field-label-wrap">
              <p className="label-p">
                {t('start_selling_form.password_confirmation.label')}
              </p>
              <div className="login-password-field-wrap text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="password_confirmation"
                  type={passwrodVisible ? 'text' : 'password'}
                  placeholder={t(
                    'start_selling_form.password_confirmation.label'
                  )}
                  errorMsg={errors?.password_confirmation?.message}
                  validateStatus={errors?.password_confirmation ? 'error' : ''}
                  control={control}
                />

                {watch('password_confirmation') && (
                  <div
                    className="eye-icon-btn"
                    style={{
                      left: i18n.dir() === 'rtl' ? '14px' : 'auto',
                      right: i18n.dir() === 'ltr' ? '14px' : 'auto'
                    }}
                    onClick={() => {
                      setPasswordVisible((prevState) => !prevState);
                    }}
                  >
                    {passwrodVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-field-label-wrap">
            <p className="label-p">{t('start_selling_form.address.label')}</p>
            <div className="text-field-wrap">
              <AntdTextField
                className="form-text-field"
                name="address"
                type="text"
                placeholder={t('start_selling_form.address.label')}
                errorMsg={errors?.address?.message}
                validateStatus={errors?.address ? 'error' : ''}
                control={control}
              />
            </div>
          </div>
          <div className="country-city-area-wrap">
            <div className="text-field-label-wrap">
              <p className="label-p">{t('start_selling_form.country.label')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="country"
                  type="text"
                  placeholder={t('start_selling_form.country.label')}
                  errorMsg={errors?.country?.message}
                  validateStatus={errors?.country ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
            <div className="text-field-label-wrap">
              <p className="label-p">{t('start_selling_form.city.label')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="city"
                  type="text"
                  placeholder={t('start_selling_form.city.label')}
                  errorMsg={errors?.city?.message}
                  validateStatus={errors?.city ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>

            <div className="text-field-label-wrap">
              <p className="label-p">{t('start_selling_form.area.label')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="area"
                  type="text"
                  placeholder={t('start_selling_form.area.label')}
                  errorMsg={errors?.area?.message}
                  validateStatus={errors?.area ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
          </div>

          <CustomMap
            width="100%"
            height="400px"
            selectedLocation={selectedLocation}
            setSelecectedLocation={setSelecectedLocation}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <Button
            className="submit-btn"
            htmlType="submit"
            type="primary"
            // icon={<LoginOutlined />}
            loading={isSubmittingForm}
          >
            {t('start_selling_form.submit_btn.label')}
          </Button>
        </div>
      </Form>

      {successOrder && (
        <LoadingModal clsName="success-order-modal">
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <img src={successOrderImg} alt="sucess order" />
          </div>
          <p>تم إنشاء حسابك بنجاح</p>

          <div className="sucess-btns-wrap">
            {orderRes?.dashboardLink && (
              <a
                className="link"
                onClick={() => {
                  setOrderRes(null);
                  setSuccessOrder(false);
                }}
                href={orderRes.dashboardLink}
                target="_blank"
                rel="noreferrer"
              >
                لوحة التحكم
              </a>
            )}
            <Button
              className="link"
              onClick={() => {
                setOrderRes(null);
                setSuccessOrder(false);
              }}
            >
              متابعة
            </Button>
          </div>
        </LoadingModal>
      )}
    </>
  );
};

export default StartSellingForm;
