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
import UserContext from '../../contexts/user-context/UserProvider';
import reportServiceApi from '../../apis/reportServiceApi';

const ReportServiceForm = ({ serviceId, setModalOpened }) => {
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const sharedLabelT = (key) => t(`reportServiceForm.${key}.label`);
  const sharedRequiredErrT = (key) => t(`reportServiceForm.${key}.label`);
  const schema = Yup.object().shape({
    report: Yup.string().required(sharedRequiredErrT('report'))
  });

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
      message: ''
    }
  });
  const customApiRequest = useCustomApiRequest();
  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append('report', data.report);
    formData.append('service_id', serviceId);

    setIsSubmittingForm(true);
    customApiRequest(
      reportServiceApi(formData, user?.token, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
          reset({
            message: ''
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
  return (
    <Form
      className="contact-seller-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">{sharedLabelT('report')}</p>
          <div className="text-field-wrap">
            <AntdTextarea
              rows={5}
              className="form-text-area"
              name="report"
              type="text"
              placeholder={sharedLabelT('report')}
              errorMsg={errors?.report?.report}
              validateStatus={errors?.report ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        <CustomSharedBtn
          loading={isSubmittingForm}
          className="submit-btn"
          type="submit"
          isButton
        >
          <span>{t('reportServiceForm.send_btn.title')}</span>
        </CustomSharedBtn>
      </div>
    </Form>
  );
};

export default ReportServiceForm;
