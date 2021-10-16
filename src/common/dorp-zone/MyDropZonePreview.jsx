import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

const MyDropZonePreview = ({
  post,
  filesToUpload,
  clearFileFromUpload,
  className
}) => {
  return (
    <>
      {filesToUpload?.length > 0 && (
        <div className={`previewFiles ${className ? className : ''}`}>
          {filesToUpload.map((file) =>
            file.type.match('video*') ? (
              <div key={file.path} className="videoPreview">
                <video src={file.preview}></video>
                <CloseOutlined
                  className="icon-cancel"
                  onClick={() => clearFileFromUpload(file, post)}
                />
              </div>
            ) : (
              <div key={file.path} className="imgPreview">
                <img src={file.preview} alt="thumbnail img" />
                <CloseOutlined
                  className="icon-cancel"
                  onClick={() => clearFileFromUpload(file, post)}
                />
              </div>
            )
          )}
        </div>
      )}
    </>
  );
};

export default MyDropZonePreview;
