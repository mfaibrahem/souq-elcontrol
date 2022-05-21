/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Form, Rate } from 'antd';
import CustomSharedBtn from '../../common/custom-shared-button/CustomSharedBtn';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import { useTranslation } from 'react-i18next';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import UserContext from '../../contexts/user-context/UserProvider';
import rateStoreApi from '../../apis/rateStoreApi';

const StoreRateForm = ({ storeId, setModalOpened }) => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const sharedLabelT = (key) => t(`rateStoreForm.${key}.label`);
  // const sharedRequiredErrT = (key) => t(`rateStoreForm.${key}.label`);
  const schema = Yup.object().shape({
    // comment: Yup.string().required(sharedRequiredErrT('comment'))
  });
  const [rate, setRate] = useState(0);
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
      rate: 0,
      comment: ''
    }
  });

  const customApiRequest = useCustomApiRequest();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('rate', rate);
    formData.append('comment', data.comment);
    formData.append('store_id', storeId);

    setIsSubmittingForm(true);
    customApiRequest(
      rateStoreApi(formData, user?.token, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
          reset({
            comment: ''
          });
          setModalOpened(false);
          successNotification({
            title: 'Operation done successfully',
            message: res?.data?.message || 'تم إرسال الشكوى بنجاح'
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
  const handleRateStore = (v) => {
    setRate(v);
  };

  return (
    <Form
      className="contact-seller-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <Rate
          className="rate-seller-btn"
          onChange={(v) => {
            handleRateStore(v);
          }}
        />
        {errors?.rate && <p>{errors?.rate?.message}</p>}

        <div className="text-field-label-wrap">
          <p className="label-p">{sharedLabelT('comment')}</p>
          <div className="text-field-wrap">
            <AntdTextarea
              rows={5}
              className="form-text-area"
              name="comment"
              type="text"
              placeholder={sharedLabelT('comment')}
              errorMsg={errors?.comment?.comment}
              validateStatus={errors?.comment ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        {rate > 0 && (
          <CustomSharedBtn
            loading={isSubmittingForm}
            className="submit-btn"
            type="submit"
            isButton
          >
            <span>{t('rateStoreForm.send_btn.title')}</span>
          </CustomSharedBtn>
        )}
      </div>
    </Form>
  );
};

export default StoreRateForm;
