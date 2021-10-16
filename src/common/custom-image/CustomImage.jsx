import { Skeleton } from 'antd';
import React from 'react';
import { useValidateImageURL } from 'use-validate-image-url';
// import DefaultSvgIcon from '../icons/DefaultSvgIcon';
import './CustomImage.scss';

const CustomImage = ({ className, src = '', alt = 'alt' }) => {
  const status = useValidateImageURL(src);

  const renderImg = () => {
    // if (status === 'progress') return <DefaultSvgIcon />;
    // if (status === 'invalid') return <DefaultSvgIcon />;
    if (status === 'progress')
      return (
        <div className={`custom-image ${className ? className : ''}`}>
          <Skeleton.Image />
        </div>
      );
    if (status === 'invalid')
      return (
        <div className={`custom-image ${className ? className : ''}`}>
          <Skeleton.Image />
        </div>
      );
    else if (status === 'valid') return <img src={src} alt={alt} />;
    return null;
  };

  return renderImg();
};

export default CustomImage;
