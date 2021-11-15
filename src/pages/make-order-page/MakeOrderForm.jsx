/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import UserContext from '../../contexts/user-context/UserProvider';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import checkRes from '../../utils/checkRes';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import CustomMap from '../../components/custom-map/CustomMap';
import { useTranslation } from 'react-i18next';
import makeOrderApi from '../../apis/orders-apis/makeOrderApi';
import makeOrderSchema from './makeOrderSchema';
import { useParams } from 'react-router-dom';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import AntdRadioGroup from '../../common/antd-form-components/AntdRadioGroup';
import './MakeOrderForm.scss';

const MakeOrderForm = () => {
  // const [urls, setUrls] = React.useState([]);
  const params = useParams();
  const { user } = useContext(UserContext);
  const { i18n, t } = useTranslation();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [selectedLocation, setSelecectedLocation] = React.useState({
    lat: '',
    lng: ''
  });
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const schema = makeOrderSchema(t);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      address: '',
      city: '',
      area: '',
      lat: '',
      lng: '',
      paymentMethod: ''
    }
  });

  console.log('watch : ', watch());
  console.log('errors : ', errors);

  const customApiRequest = useCustomApiRequest();
  const onSubmit = async (data) => {
    const formData = new FormData();
    if (data.address) formData.append('address', data.address);
    if (data.city) formData.append('city', data.city);
    if (data.area) formData.append('area', data.area);
    if (data.paymentMethod)
      formData.append('paymentMethod', data.paymentMethod);
    formData.append(
      'lat',
      selectedLocation?.lat ? selectedLocation.lat : '23.8859'
    );
    formData.append(
      'lng',
      selectedLocation?.lng ? selectedLocation.lng : '45.0792'
    );
    formData.append('service_id', params?.serviceId);

    const mappedData = {};
    if (data.address) mappedData.address = data.address;
    if (data.city) mappedData.city = data.city;
    if (data.area) mappedData.area = data.area;
    if (data.paymentMethod) mappedData.paymentMethod = data.paymentMethod;
    mappedData.service_id = params?.serviceId;
    mappedData.lat = selectedLocation?.lat ? selectedLocation.lat : '23.8859';
    mappedData.lng = selectedLocation?.lng ? selectedLocation.lng : '45.0792';

    setIsSubmittingForm(true);
    customApiRequest(
      makeOrderApi(mappedData, user?.token, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
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
    <Form
      className="make-order-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">{t('make_order_form.address.label')}</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="address"
              type="text"
              placeholder={t('make_order_form.address.label')}
              errorMsg={errors?.address?.message}
              validateStatus={errors?.address ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
        <div className="text-field-label-wrap">
          <p className="label-p">{t('make_order_form.city.label')}</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="city"
              type="text"
              placeholder={t('make_order_form.city.label')}
              errorMsg={errors?.city?.message}
              validateStatus={errors?.city ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        <div className="text-field-label-wrap">
          <p className="label-p">{t('make_order_form.area.label')}</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="area"
              type="text"
              placeholder={t('make_order_form.area.label')}
              errorMsg={errors?.area?.message}
              validateStatus={errors?.area ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        <AntdRadioGroup
          name="paymentMethod"
          className="form-radio-group"
          control={control}
          label={t('make_order_form.payment_method.label')}
          validateStatus={errors?.details_type ? 'error' : ''}
          errorMsg={errors?.details_type?.message}
          radios={[
            {
              title: t('make_order_form.cash'),
              value: '1'
            },
            {
              title: t('make_order_form.visa'),
              value: '2'
            }
          ]}
          // defaultValue={
          //   selectedRecipt?.detailsType
          //     ? String(selectedRecipt.detailsType)
          //     : ''
          // }
          // isRadioButton
        />

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
          {t('make_order_form.submit_btn.label')}
        </Button>
      </div>
    </Form>
  );
};

export default MakeOrderForm;
