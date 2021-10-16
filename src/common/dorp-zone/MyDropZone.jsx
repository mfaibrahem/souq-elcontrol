import './MyDropZone.scss';
import React from 'react';
import Dropzone from 'react-dropzone';

const MyDropZone = ({
  multipleFiles,
  handleFilesDrop,
  filesToUpload,
  formName,
  id,
  dropzoneText,
  inputName,
  className,
  children,
  icon,
  dropZoneUrls
}) => {
  const acceptFiles =
    'image/jpg, image/png, image/jpeg, image/gif, video/mp4, video/mkv, video/avi';

  return (
    <Dropzone
      onDrop={(acceptedFiles) => handleFilesDrop(acceptedFiles)}
      // accept="image/*, video/*"
      accept={acceptFiles}
      multiple={multipleFiles}
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <div
            className={`dropZone-wrapper ${
              filesToUpload?.length > 0 ? 'hideMe' : ''
            } ${className}`}
          >
            <div
              className={`${filesToUpload?.length > 0 ? 'filled' : ''}`}
              {...getRootProps()}
            >
              <input
                name={inputName}
                id={id}
                {...getInputProps()}
                form={formName}
              />
              {dropZoneUrls?.length > 0 ? (
                <ul className="dropzone-default-imgs-ul">
                  {dropZoneUrls.map((url, index) => {
                    return (
                      <img
                        key={index}
                        className="default-dropzone-img"
                        src={url}
                        alt="url"
                      />
                    );
                  })}
                </ul>
              ) : (
                <div className={`dropZone ${isDragActive ? 'dragZone' : ''}`}>
                  <div className="placeholderText">
                    {icon ? icon : <i className="icon-upload-cloud-4"></i>}
                    <p>{dropzoneText}</p>
                    {children}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};

export default MyDropZone;
