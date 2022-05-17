import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AntdTextField from '../../common/antd-form-components/AntdTextField';
import { Form } from 'antd';
import CustomSharedBtn from '../../common/custom-shared-button/CustomSharedBtn';
import checkRes from '../../utils/checkRes';
import successNotification from '../../utils/successNotification';
import errorNotification from '../../utils/errorNotification';
import { useTranslation } from 'react-i18next';
import AntdTextarea from '../../common/antd-form-components/AntdTextarea';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import './PostForm.scss';
import FileInput from '../../common/file-input/FileInput';
import addNewPostApi from '../../apis/posts-apis/addNewPostApi';
import AntdSelectOption from '../../common/antd-form-components/AntdSelectOption';
import useSubCats from '../../custom-hooks/useSubCats';
import fixedMainCats from '../../fixedMainCats';
import UserContext from '../../contexts/user-context/UserProvider';

const PostForm = ({
  selectedPost,
  setSelectedPost,
  setModalOpened,
  setFetchCount
}) => {
  const { t, i18n } = useTranslation();
  const sharedFormLabel = (key) => t(`postForm.${key}.label`);
  const sharedFormRequiredErr = (key) => t(`postForm.${key}.errors.required`);

  const schema = Yup.object().shape({
    title: Yup.string().required(sharedFormRequiredErr('title')),
    content: Yup.string().required(sharedFormRequiredErr('content')),
    cat_id: Yup.string().required(sharedFormRequiredErr('catId'))
  });
  const { allFetchedSubCats } = useSubCats(fixedMainCats?.postService);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    unregister,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      title: '',
      content: '',
      cat_id: '',
      image: null
    }
  });
  const customApiRequest = useCustomApiRequest();
  const { user } = useContext(UserContext);
  const onSubmit = (data) => {
    setIsSubmittingForm(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('cotent', data.content);
    formData.append('cat_id', data.cat_id);

    if (data?.image?.length > 0) formData.append('image', data.image[0]);
    customApiRequest(
      addNewPostApi(formData, user?.token, i18n.language),
      (res) => {
        setIsSubmittingForm(false);
        if (checkRes(res)) {
          setSelectedPost(null);
          setFetchCount((prev) => prev + 1);
          setModalOpened(false);
          successNotification({
            title: 'Operation done successfully',
            message: res?.data?.message || 'تم إرسال الرسالة بنجاح'
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
      className="post-form custom-shared-form"
      form={form}
      layout="vertical"
      onFinish={handleSubmit(onSubmit)}
    >
      <div className="form-body">
        <div className="text-field-label-wrap">
          <div className="text-field-wrap">
            <AntdTextField
              className="form-text-field"
              name="title"
              type="text"
              label={sharedFormLabel('title')}
              placeholder={sharedFormLabel('title')}
              errorMsg={errors?.title?.message}
              validateStatus={errors?.title ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        <div className="select-label-wrap">
          <p className="label-p">{sharedFormLabel('catId')}</p>
          <div className="custom-select-wrap without-icon">
            <AntdSelectOption
              name={`cat_id`}
              errorMsg={errors?.cat_id && errors.cat_id.message}
              validateStatus={errors?.cat_id ? 'error' : ''}
              control={control}
              setValue={setValue}
              placeholder={sharedFormLabel('catId')}
              // prefix={<UserIcon />}
              options={
                allFetchedSubCats?.cats?.length > 0 &&
                allFetchedSubCats.cats.map((obj) => ({
                  title: obj?.name,
                  value: String(obj?.id)
                }))
              }
              showSearch={true}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              formClassName="post-form"
            />
          </div>
        </div>

        <div className="text-field-label-wrap">
          <div className="text-field-wrap">
            <AntdTextarea
              rows={5}
              className="form-text-area"
              name="content"
              type="text"
              label={sharedFormLabel('content')}
              placeholder={sharedFormLabel('content')}
              errorMsg={errors?.content?.message}
              validateStatus={errors?.content ? 'error' : ''}
              control={control}
            />
          </div>
        </div>

        <FileInput
          name="image"
          // label="ارفع ملف الاسئلة المطلوبة"
          label={null}
          // accept="image/png, image/jpg, image/jpeg, image/gif, .pdf"
          accept="image/*, application/*"
          multiple={false}
          setValue={setValue}
          watch={watch}
          register={register}
          unregister={unregister}
          // setUrls={setUrls}
          dropzoneText="اسحب الملف وضعه هنا ..."
          className="product-images-dropzone"
          //  dropzoneUrls={
          //    selectedCategory?.image ? [{ url: selectedCategory.image }] : []
          //  }
          canDelete={false}
        />

        <CustomSharedBtn
          loading={isSubmittingForm}
          className="submit-btn"
          type="submit"
          isButton
        >
          <span>{t('contact_us_section.contact_form.send_btn')}</span>
        </CustomSharedBtn>
      </div>
    </Form>
  );
};

export default PostForm;
