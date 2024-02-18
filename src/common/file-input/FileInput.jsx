import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '../icons/DeleteIcon';
// import { useFormContext } from 'react-hook-form';
import './FileInput.scss';

const FileInput = (props) => {
  const {
    name,
    label = name,
    accept,
    multiple,
    setValue,
    // watch,
    register,
    unregister,
    className,
    icon,
    dropzoneText,
    children,
    dropzoneUrls,
    canDelete = true,
    handleDeleteImgReq,
    showError,
    errorMsg
  } = props;
  // const { register, unregister, setValue, watch } = useFormContext();

  // const files = watch(name);
  const [files, setFiles] = React.useState(null);

  // console.log('form files: ', files);
  const onDrop = useCallback(
    (droppedFiles) => {
      // console.log('dropped files: ', droppedFiles);
      if (multiple)
        setFiles((prev) =>
          prev?.legth >= 0 ? [...prev, ...droppedFiles] : [...droppedFiles]
        );
      else setFiles([...droppedFiles]);

      // setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    multiple: multiple
  });

  useEffect(() => {
    if (!files || files?.length === 0) {
      setValue(name, null, { shouldValidate: true });
    } else setValue(name, files, { shouldValidate: true });
  }, [files, name]);

  // useEffect(() => {
  //   if (acceptedFiles?.length > 0) {
  //     // setValue(name, acceptedFiles, { shouldValidate: true });
  //     setFiles(acceptedFiles);
  //     // read file
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //       props.setUrls([reader.result]);
  //     });
  //     reader.readAsDataURL(acceptedFiles[0]);
  //   }
  // }, [acceptedFiles, name]);

  // console.log('accepted files: ', acceptedFiles);

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }
  const renderFiles = (fileArr) => {
    return (
      <ul className="dropzone-default-imgs-ul">
        {fileArr.map((file, index) => {
          return (
            <div className="img-delete-btn-warp" key={index}>
              <div
                className="delete-img-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(
                    (prev) =>
                      prev?.length > 0 && prev.filter((f, i) => i !== index)
                  );
                  // setValue(
                  //   name,
                  //   acceptedFiles.filter((f, i) => i !== index),
                  //   { shouldValidate: true }
                  // );
                }}
              >
                <DeleteIcon />
              </div>
              {isFileImage(file) ? (
                <img
                  onClick={(e) => e.stopPropagation()}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  // style={{ width: '100px', height: '100px' }}
                  className="default-dropzone-img"
                />
              ) : (
                <p
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#eee',
                    paddingLeft: '44px'
                  }}
                >
                  {file['name']}
                </p>
              )}
            </div>
          );
        })}
        {fileArr?.length > 0 && multiple && (
          <div className="add-more-li-btn">+</div>
        )}
      </ul>
    );
  };

  const renderUrls = (urlsArr) => {
    return (
      <ul className="dropzone-default-imgs-ul">
        {urlsArr.map((urlObj, index) => {
          return (
            <div className="img-delete-btn-warp" key={index}>
              {canDelete && (
                <div
                  className="delete-img-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImgReq(urlObj?.id);
                    // setValue(
                    //   name,
                    //   acceptedFiles.filter((f, i) => i !== index),
                    //   { shouldValidate: true }
                    // );
                  }}
                >
                  <DeleteIcon />
                </div>
              )}
              <img
                onClick={(e) => e.stopPropagation()}
                src={urlObj?.url}
                alt={'url'}
                // style={{ width: '100px', height: '100px' }}
                className="default-dropzone-img"
              />
            </div>
          );
        })}

        {urlsArr?.length > 0 && (!files || files?.length === 0) && multiple && (
          <li className="add-more-li-btn">+</li>
        )}
      </ul>
    );
  };

  return (
    <>
      <div className={`file-input-wrapper ${className}`}>
        <label className="file-input-label" htmlFor={name}>
          {label}
        </label>
        <div {...getRootProps()}>
          <input
            // {...props}
            name={name}
            label={label}
            accept={accept}
            className="file-input-itself"
            id={name}
            {...getInputProps()}
          />
          <div
            className={`dropZone ${isDragActive ? 'dragZone' : ''} ${
              errorMsg ? 'with-error' : ''
            }`}
          >
            {(!files || files?.length === 0) &&
              (!dropzoneUrls || dropzoneUrls?.length === 0) && (
                <div className="placeholderText">
                  {icon ? icon : <i className="icon-upload-cloud-4"></i>}
                  <p>{dropzoneText}</p>
                  {children}
                </div>
              )}
            {/* Optionally you may display a preview of the file(s) */}
            {files?.length > 0 && renderFiles(files)}
            {dropzoneUrls?.length > 0 &&
              (!files ||
                files?.length === 0 ||
                (files?.length > 0 && multiple)) &&
              renderUrls(dropzoneUrls)}
            {/* {(files?.length > 0 || dropzoneUrls?.length > 0) && multiple && (
              <div>+ Add more</div>
            )} */}
          </div>
        </div>
        {showError && errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </div>
    </>
  );
};

export default FileInput;
