/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import MyDropZone from '../../common/dorp-zone/MyDropZone';
import MyDropZonePreview from '../../common/dorp-zone/MyDropZonePreview';
import { CameraFilled } from '@ant-design/icons';
import UserContext from '../../contexts/user-context/UserProvider';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import getUserInfo from '../../apis/auth/myInfoApi';
import updateProfileApi from '../../apis/auth/updateProfileApi';
import checkRes from '../../utils/checkRes';

const schema = Yup.object().shape({
  name: Yup.string().required('ادخل الاســـم'),
  phone: Yup.string()
    .required('ادخل رقم الهاتف')
    .matches(/^[0-9]+$/, 'لا يسمح الا بكتابة الارقام')
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
      image: null
    }
  });

  const { user, setCurrentUser } = useContext(UserContext);
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

  console.log('user : ', user);

  const [systemFilesToUpload, setSystemFilesToUpload] = useState(
    watch('image') ? watch('image') : null
  );
  useEffect(() => {
    // if (orgainzationHeaderToUpload?.length > 0) {
    setValue('image', systemFilesToUpload);
    // reset({ ...watch(), organization_header: orgainzationHeaderToUpload });
    // }
  }, [systemFilesToUpload, systemFilesToUpload?.length]);
  useEffect(() => {
    register('image');
    return () => unregister('image');
  }, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleFilesDrop = async (acceptedFiles, formFiles, setFormFiles) => {
    const duplicates = [];
    for (let i of acceptedFiles) {
      if (formFiles?.length) {
        for (let f of formFiles) {
          if (i.name === f.name) {
            duplicates.push(i);
          }
        }
      }
    }
    for (let i = 0; i < acceptedFiles.length; i++) {
      for (let f of duplicates) {
        if (acceptedFiles[i].name === f.name) {
          acceptedFiles.splice(i, 1);
        }
      }
    }

    acceptedFiles.forEach(async (file) => {
      const preview = await getBase64(file);
      Object.assign(file, {
        preview
      });
      // setFormFiles((prevState) => [...prevState, file]);
      if (formFiles?.length > 0) {
        setFormFiles((currState) => [...currState, file]);
      } else {
        setFormFiles([file]);
      }
    });
  };

  const clearFileFromUpload = (file, setFilesToUpload) => {
    setFilesToUpload((prevState) => {
      const filtered = prevState.filter((asset) => asset.name !== file.name);
      if (filtered?.length === 0) return null;
      return filtered;
    });
  };

  // handle Initial values
  const [systemImgUrl, setSystemImgUrl] = useState(null);
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
      if (user?.image) {
        setSystemImgUrl([user.image]);
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
      if (res?.status === 200 && res?.data?.data) {
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
      console.log('error');
      errorNotification({
        title: 'حدث خطأ',
        message: 'حاول فى وقت لاحق'
      });
    }
  };

  const [form] = Form.useForm();
  return (
    <Form
      className="custom-shared-form"
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
        <div className="text-field-label-wrap">
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
        </div>
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
        <div className="text-field-label-wrap">
          <p className="label-p">العنوان</p>
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="address"
              type="text"
              placeholder="العنوان..."
              errorMsg={errors?.address?.message}
              validateStatus={errors?.address ? 'error' : ''}
              control={control}
            />
          </div>
        </div>
        <div className="product-img-wrap">
          <h3>صورة المستخدم</h3>

          <MyDropZone
            className="product-header-dropzone"
            multipleFiles={false}
            handleFilesDrop={(acceptedFiles) =>
              handleFilesDrop(
                acceptedFiles,
                systemFilesToUpload,
                setSystemFilesToUpload
              )
            }
            filesToUpload={systemFilesToUpload}
            formName="store-new-product-form"
            id="avatar-input"
            dropzoneText="صورة المستخدم"
            inputName="image"
            icon={<CameraFilled className="dropzone-camera" />}
            dropZoneUrls={systemImgUrl}
          >
            اسحب الصورة وضعها هنا
          </MyDropZone>

          <MyDropZonePreview
            filesToUpload={systemFilesToUpload}
            clearFileFromUpload={(f) =>
              clearFileFromUpload(f, setSystemFilesToUpload)
            }
          />
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
