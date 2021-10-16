import React, { useCallback, useEffect } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

const FileInput = (props) => {
  const { name, label = name, accept } = props;
  const { register, unregister, setValue, watch } = useFormContext();

  const files = watch(name);

  const onDrop = useCallback(
    (droppedFiles) => {
      // console.log(droppedFiles);
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
  });

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  return (
    <>
      <label className="file-input-label" htmlFor={name}>
        {label}
      </label>
      <div {...getRootProps()}>
        <input
          {...props}
          className="file-input-itself"
          id={name}
          {...getInputProps()}
        />
        <div
          className={
            'dashed-border' + (isDragActive ? 'gray-500-bg' : 'gray-200-bg')
          }
        >
          <p className="text-center my-2">Drop the files here ...</p>
          {/* Optionally you may display a preview of the file(s) */}
          {!!files?.length && (
            <div className="grid gap-1 grid-cols-4 mt-2">
              {files.map((file) => {
                return (
                  <div key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: '100px', height: '100px' }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileInput;
