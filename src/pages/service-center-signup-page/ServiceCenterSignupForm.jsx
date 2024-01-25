/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Form, Button, Tooltip } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import checkRes from '../../utils/checkRes';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import CustomMap from '../../components/custom-map/CustomMap';
import { useTranslation } from 'react-i18next';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import createStoreApi from '../../apis/store-apis/createStoreApi';
import successOrderImg from '../../assets/imgs/icons/success-order.png';
import './ServiceCenterSignupForm.scss';
import PhoneInput from 'react-phone-number-input';
import LoadingModal from '../../common/loading-modal/LoadingModal';
import serviceCenterSignupFormSchema from './serivceCenterSignupSchema';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';
import emergencyTypes from '../../emergencyTypes';
import RadioButtonFilled from '../../common/icons/RadioButtonFilled';
import RadioButtonEmpty from '../../common/icons/RadioButtonEmpty';
import AntdSelectOption from '../../common/antd-form-components/AntdSelectOption';
import useCities from '../../custom-hooks/useCities';
import weekDaysArr from '../../weekDaysArr';
import { DeleteOutlined } from '@ant-design/icons';

const ServiceCenterSignupForm = () => {
  // const [urls, setUrls] = React.useState([]);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { i18n, t } = useTranslation();
  const [selectedLocation, setSelecectedLocation] = React.useState({
    lat: '',
    lng: ''
  });
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [passwrodVisible, setPasswordVisible] = React.useState(false);

  const schema = serviceCenterSignupFormSchema(t);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      phone: '',
      store_whatsapp: '',
      email: '',
      services: '',
      mangerName: '',
      mangerPhone: '',
      mangerWhatsapp: '',
      emergencyStatus: '',
      workTimes: [
        {
          day: '',
          time: ''
        }
      ],
      city_id: '',
      password: '',
      password_confirmation: '',
      address: '',
      lat: '',
      lng: ''
    }
  });

  const {
    fields: workTimeFields,
    append: appendWorkTimeField,
    remove: removeWorkTimeField
  } = useFieldArray({
    control,
    name: 'workTimes'
  });

  const [successOrder, setSuccessOrder] = useState(false);
  // const [orderRes, setOrderRes] = useState(null);
  const { allFetchedCities } = useCities();
  const customApiRequest = useCustomApiRequest();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('type', '2');
    if (data.name) formData.append('name', data.name);
    if (data.phone) formData.append('phone', data.phone);
    if (data.store_whatsapp)
      formData.append('store_whatsapp', `${data.store_whatsapp}`);
    if (data.email) formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    if (data.password_confirmation)
      formData.append('password_confirmation', data.password_confirmation);
    if (data.city_id) formData.append('city_id', data.city_id);
    if (data.address) formData.append('address', data.address);
    formData.append('lat', selectedLocation?.lat ? selectedLocation.lat : '');
    formData.append('lng', selectedLocation?.lng ? selectedLocation.lng : '');
    if (data.mangerName) formData.append('mangerName', data.mangerName);
    if (data.mangerPhone) formData.append('mangerPhone', data.mangerPhone);
    if (data.mangerWhatsapp)
      formData.append('mangerWhatsapp', `${data.mangerWhatsapp}`);
    if (data.services) formData.append('services', data.services);
    if (data.emergencyStatus)
      formData.append('emergencyStatus', data.emergencyStatus);
    if (data.workTimes?.length > 0) {
      const mappedArr = data.workTimes.map((item) => {
        let dayString = weekDaysArr(t)?.find(
          (obj) => obj?.id == item?.day
        )?.name;

        return `${dayString} ${item?.time}`;
      });
      for (let i of mappedArr) {
        formData.append('workTimes[]', i);
      }
    }
    setIsSubmittingForm(true);
    customApiRequest(
      createStoreApi(formData, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res) && res?.data?.data) {
          reset({
            name: '',
            phone: '',
            store_whatsapp: '',
            email: '',
            password: '',
            password_confirmation: '',
            city_id: '',
            address: '',
            lat: '',
            lng: '',
            mangerName: '',
            mangerPhone: '',
            mangerWhatsapp: '',
            workTimes: [],
            emergencyStatus: '',
            services: ''
          });
          setSuccessOrder(true);
          // setOrderRes(res.data.data);
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
  const sharedLabelTrans = (key) => t(`service_center_form.${key}.label`);

  const [form] = Form.useForm();
  return (
    <>
      <Form
        className="start-selling-form service-center-form custom-shared-form"
        form={form}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
      >
        <div className="form-body">
          <div className="text-field-label-wrap">
            <p className="label-p">{sharedLabelTrans('name')}</p>
            <div className="text-field-wrap">
              <AntdTextField
                className="form-text-field"
                name="name"
                type="text"
                placeholder={sharedLabelTrans('name')}
                errorMsg={errors?.name?.message}
                validateStatus={errors?.name ? 'error' : ''}
                control={control}
              />
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
                {sharedLabelTrans('phone')}
              </p>
              <Controller
                name="phone"
                control={control}
                // render={({ field: { onChange, onBlur, value, name, ref } }) => {
                render={({ field }) => {
                  return (
                    <PhoneInput
                      {...field}
                      placeholder={sharedLabelTrans('phone')}
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
                {sharedLabelTrans('store_whatsapp')}
              </p>
              <Controller
                name="store_whatsapp"
                control={control}
                // render={({ field: { onChange, onBlur, value, name, ref } }) => {
                render={({ field }) => {
                  return (
                    <PhoneInput
                      {...field}
                      placeholder={sharedLabelTrans('store_whatsapp')}
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
              <p className="label-p">{sharedLabelTrans('email')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="email"
                  type="text"
                  placeholder={sharedLabelTrans('email')}
                  errorMsg={errors?.email?.message}
                  validateStatus={errors?.email ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
          </div>

          <div className="passwords-wrap">
            <div className="text-field-label-wrap">
              <p className="label-p">{sharedLabelTrans('password')}</p>
              <div className="login-password-field-wrap text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="password"
                  type={passwrodVisible ? 'text' : 'password'}
                  placeholder={sharedLabelTrans('password')}
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
                {sharedLabelTrans('password_confirmation')}
              </p>
              <div className="login-password-field-wrap text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="password_confirmation"
                  type={passwrodVisible ? 'text' : 'password'}
                  placeholder={sharedLabelTrans('password_confirmation')}
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

          <div className="address-city-wrapper">
            <div className="text-field-label-wrap">
              <p className="label-p">{sharedLabelTrans('address')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="address"
                  type="text"
                  placeholder={sharedLabelTrans('address')}
                  errorMsg={errors?.address?.message}
                  validateStatus={errors?.address ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>

            <div className="select-label-wrap">
              <p className="label-p">{sharedLabelTrans('city')}</p>
              <div className="custom-select-wrap without-icon">
                <AntdSelectOption
                  name={`city_id`}
                  errorMsg={errors?.city_id && errors.city_id.message}
                  validateStatus={errors?.city_id ? 'error' : ''}
                  control={control}
                  setValue={setValue}
                  placeholder={sharedLabelTrans('city')}
                  // prefix={<UserIcon />}
                  options={
                    allFetchedCities?.length > 0 &&
                    allFetchedCities.map((obj) => ({
                      title: obj?.name,
                      value: String(obj?.id)
                    }))
                  }
                  showSearch={true}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  formClassName="service-center-form"
                />
              </div>
            </div>
          </div>

          <div className="manger-data-wrap">
            <div className="text-field-label-wrap">
              <p className="label-p">{sharedLabelTrans('mangerName')}</p>
              <div className="text-field-wrap">
                <AntdTextField
                  className="form-text-field"
                  name="mangerName"
                  type="text"
                  placeholder={sharedLabelTrans('mangerName')}
                  errorMsg={errors?.mangerName?.message}
                  validateStatus={errors?.mangerName ? 'error' : ''}
                  control={control}
                />
              </div>
            </div>
            <div className="manger-phones-wrapper">
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
                  {sharedLabelTrans('phone')}
                </p>
                <Controller
                  name="mangerPhone"
                  control={control}
                  // render={({ field: { onChange, onBlur, value, name, ref } }) => {
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        {...field}
                        placeholder={sharedLabelTrans('mangerPhone')}
                        // value={phoneValue}
                        // onChange={setPhoneValue}
                        defaultCountry="EG"
                        className={`custom-phone-input ${i18n.dir()}`}
                      />
                    );
                  }}
                />
                <p className="error-p">{errors?.mangerPhone?.message}</p>
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
                  {sharedLabelTrans('mangerWhatsapp')}
                </p>
                <Controller
                  name="mangerWhatsapp"
                  control={control}
                  // render={({ field: { onChange, onBlur, value, name, ref } }) => {
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        {...field}
                        placeholder={sharedLabelTrans('mangerWhatsapp')}
                        // value={phoneValue}
                        // onChange={setPhoneValue}
                        defaultCountry="EG"
                        className={`custom-phone-input ${i18n.dir()}`}
                      />
                    );
                  }}
                />
                <p className="error-p">{errors?.mangerWhatsapp?.message}</p>
              </div>
            </div>
          </div>

          <div className="text-field-label-wrap">
            <p className="label-p">{sharedLabelTrans('services')}</p>
            <div className="text-field-wrap">
              <AntdTextarea
                rows={5}
                className="form-text-area"
                name="services"
                type="text"
                placeholder={sharedLabelTrans('services')}
                errorMsg={errors?.services?.message}
                validateStatus={errors?.services ? 'error' : ''}
                control={control}
              />
            </div>
          </div>

          <div className="radios-wrap">
            <p className="radios-group-title">
              {sharedLabelTrans('emergencyStatus')}
            </p>
            <div className="labels-wrap need-label">
              {emergencyTypes(t)?.length > 0 &&
                emergencyTypes(t).map((obj) => (
                  <label
                    key={obj?.id}
                    className={`radio-input-label ${i18n.dir()} ${
                      String(watch(`emergencyStatus`)) == String(obj.id)
                        ? 'selected'
                        : ''
                    }`}
                  >
                    <input
                      onClick={() => {
                        if (watch('emergencyStatus') == obj?.value) {
                          setValue('emergencyStatus', '');
                        }
                      }}
                      type="radio"
                      value={obj?.value}
                      {...register(`emergencyStatus`)}
                    />
                    {watch(`emergencyStatus`) == obj?.value ? (
                      <RadioButtonFilled />
                    ) : (
                      <RadioButtonEmpty />
                    )}
                    <span>{obj?.name}</span>
                  </label>
                ))}
            </div>
            {errors?.emergencyStatus && (
              <p
                className="error-p"
                style={{
                  padding: '0 18px'
                }}
              >
                {errors?.emergencyStatus?.message}
              </p>
            )}
          </div>

          <div className="work-times-wrapper">
            <button
              type="button"
              className="add-new-field-btn"
              style={{
                marginBottom: 12
              }}
              disabled={workTimeFields?.length === 7}
              onClick={() => {
                appendWorkTimeField({
                  day: '',
                  time: ''
                });
              }}
            >
              <span>+ إضافة يوم</span>
            </button>

            <div className="work-time-fields-wrapper">
              {workTimeFields?.length > 0 &&
                workTimeFields.map((item, index) => {
                  return (
                    <div key={item?.id} className="field-delete-wrapper">
                      <div className="worktime-field-wrapper">
                        <div className="select-label-wrap">
                          <p className="label-p">{sharedLabelTrans('day')}</p>
                          <div className="custom-select-wrap3 custom-select-wrap without-icon">
                            <AntdSelectOption
                              name={`workTimes.${index}.day`}
                              errorMsg={
                                errors?.workTimes &&
                                errors.workTimes[index]?.day &&
                                errors.workTimes[index].day.message
                              }
                              validateStatus={
                                errors?.workTimes &&
                                errors.workTimes[index]?.day &&
                                errors?.workTimes[index]?.day
                                  ? 'error'
                                  : ''
                              }
                              control={control}
                              setValue={setValue}
                              placeholder={sharedLabelTrans('day')}
                              // prefix={<UserIcon />}
                              options={
                                weekDaysArr(t)?.length > 0 &&
                                weekDaysArr(t).map((obj) => ({
                                  title: obj?.name,
                                  value: String(obj?.id)
                                }))
                              }
                              showSearch={true}
                              // onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              formClassName="service-center-form"
                            />
                          </div>
                        </div>
                        <div className="text-field-label-wrap">
                          <p className="label-p">{sharedLabelTrans('time')}</p>
                          <div className="text-field-wrap">
                            <AntdTextField
                              className="form-text-field form-text-field3"
                              name={`workTimes.${index}.time`}
                              type="text"
                              placeholder={sharedLabelTrans('time')}
                              errorMsg={
                                errors?.workTimes &&
                                errors.workTimes[index]?.time &&
                                errors.workTimes[index].time.message
                              }
                              validateStatus={
                                errors?.workTimes &&
                                errors.workTimes[index]?.time &&
                                errors?.workTimes[index]?.time
                                  ? 'error'
                                  : ''
                              }
                              control={control}
                            />
                          </div>
                        </div>
                      </div>

                      {workTimeFields?.length > 1 && (
                        <Tooltip title="حذف">
                          <Button
                            className="delete-field-btn"
                            size="large"
                            type="dashed"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => removeWorkTimeField(index)}
                          />
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
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

          <Button
            className="link"
            onClick={() => {
              // setOrderRes(null);
              setSuccessOrder(false);
            }}
          >
            متابعة
          </Button>
        </LoadingModal>
      )}
    </>
  );
};

export default ServiceCenterSignupForm;
