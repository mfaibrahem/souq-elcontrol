import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import PostForm from './PostForm';

const PostModal = ({
  modalOpened,
  setModalOpened,
  selectedPost,
  setSelectedPost,
  setFetchCount
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      transitionName=""
      className="product-form-modal shared-custom-modal"
      width="90%"
      style={{ maxWidth: '742px' }}
      title={
        <div className="modal-title">
          {selectedPost ? t('blogsPage.edit') : t('blogsPage.addNew')}
        </div>
      }
      visible={modalOpened}
      onOk={() => {
        setModalOpened(false);
        setSelectedPost(null);
      }}
      onCancel={() => {
        setModalOpened(false);
        setSelectedPost(null);
      }}
      footer={false}
    >
      <PostForm
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        setModalOpened={setModalOpened}
        setFetchCount={setFetchCount}
      />
    </Modal>
  );
};

export default PostModal;
