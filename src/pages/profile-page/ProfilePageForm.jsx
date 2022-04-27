/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Form, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import UserContext from '../../contexts/user-context/UserProvider';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import getUserInfo from '../../apis/auth/myInfoApi';
import updateProfileApi from '../../apis/auth/updateProfileApi';
import checkRes from '../../utils/checkRes';
import FileInput from '../../common/file-input/FileInput';
import EyeOpenedIcon from '../../common/icons/EyeOpenedIcon';
import EyeClosedIcon from '../../common/icons/EyeClosedIcon';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-number-input';

const schema = Yup.object().shape({
  name: Yup.string().required('ادخل الاســـم'),
  phone: Yup.string()
    .required('ادخل رقم الهاتف')
    // .matches(/^[0-9]+$/, 'لا يسمح الا بكتابة الارقام')
    .min(10, 'اقل حد 10 ارقام'),
  email: Yup.string()
    .required('ادخل البريد الاكترونى')
    .email('ادخل بريد الكترونى صحيح')
});

const ProfilePageForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    unregister,
    // setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      image: null
    }
  });

  const { i18n } = useTranslation();
  const { user, setCurrentUser } = useContext(UserContext);
  const [passwrodVisible, setPasswordVisible] = React.useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        // setIsLoading(true);
        const res = await getUserInfo(user?.token);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data.data;
            setCurrentUser({
              ...data,
              information: null,
              categories: null,
              token: user.token
            });
            // setIsLoading(false);
          } else {
            // setIsLoading(false);
          }
        }
      } catch (error) {
        // setIsLoading(false);
        console.log(error);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [fetchCount]);

  // handle Initial values
  useEffect(() => {
    if (user) {
      if (user?.name) {
        setValue('name', user.name);
      }
      if (user?.phone) {
        setValue('phone', user.phone);
      }
      if (user?.email) {
        setValue('email', user.email);
      }
    }
  }, [user]);

  const onSubmit = async (data) => {
    // if (!watch('image') && !systemImgUrl) {
    //   setError('image', {
    //     type: 'required',
    //     message: 'اختار صورة البروفايل'
    //   });
    // }

    try {
      const mappedData = new FormData();
      if (data.name) mappedData.append('name', data.name);
      if (data.phone) mappedData.append('phone', data.phone);
      if (data.email) mappedData.append('email', data.email);
      if (data.image) mappedData.append('image', data.image[0]);
      const res = await updateProfileApi(user?.token, mappedData);
      if (checkRes(res)) {
        setFetchCount((prev) => prev + 1);
        successNotification({
          title: 'العملية تمت بنجاح',
          message: 'تم تعديل البيانات بنجاح'
        });
      } else {
        errorNotification({
          title: 'حدث خطأ',
          message: res?.data?.message ? res.data.message : 'حاول فى وقت لاحق'
        });
      }
    } catch (error) {
      errorNotification({
        title: 'حدث خطأ',
        message: 'حاول فى وقت لاحق'
      });
    }
  };

  const [form] = Form.useForm();
  return (
    <Form
      className="custom-shared-form profile-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <p className="label-p">الاســــم</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="name"
              type="text"
              placeholder="الاســــم..."
              errorMsg={errors?.name?.message}
              validateStatus={errors?.name ? 'error' : ''}
              control={control}
            />
          </div>
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
            رقم الهاتف
          </p>
          <Controller
            name="phone"
            control={control}
            // render={({ field: { onChange, onBlur, value, name, ref } }) => {
            render={({ field }) => {
              return (
                <PhoneInput
                  {...field}
                  placeholder="رقم الهاتف"
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

        {/* <div className="text-field-label-wrap">
          <p className="label-p">رقــم الهاتف</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="phone"
              type="text"
              placeholder="رقــم الهاتف..."
              errorMsg={errors?.phone?.message}
              validateStatus={errors?.phone ? 'error' : ''}
              control={control}
            />
          </div>
        </div> */}
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
        <div className="login-password-field-wrap">
          <AntdTextField
            className="form-text-field"
            name="password"
            type={passwrodVisible ? 'text' : 'password'}
            placeholder="password"
            label="password"
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

        <FileInput
          name="image"
          label="صورة المستخدم"
          // accept="image/png, image/jpg, image/jpeg, image/gif"
          accept="image/*"
          multiple={false}
          setValue={setValue}
          watch={watch}
          register={register}
          unregister={unregister}
          // setUrls={setUrls}
          dropzoneText="اسحب صورة المستخدم وضعها هنا ..."
          className="product-images-dropzone"
          dropzoneUrls={user?.image ? [{ url: user?.image }] : []}
          canDelete={false}
        />
        <div className="product-img-wrap">
          {errors?.image?.message && !watch('image') && (
            <p className="error-p">{errors.image.message}</p>
          )}
        </div>

        <Button
          className="submit-btn"
          htmlType="submit"
          type="primary"
          // icon={<LoginOutlined />}
          loading={isSubmitting}
        >
          حفظ
        </Button>
      </div>
    </Form>
  );
};

export default ProfilePageForm;
