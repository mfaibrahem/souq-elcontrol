import { Skeleton } from 'antd';
import React from 'react';
import { useValidateImageURL } from 'use-validate-image-url';
// import DefaultSvgIcon from '../icons/DefaultSvgIcon';
import './CustomImage.scss';

const CustomImage = ({ className, src = '', alt = 'alt' }) => {
  const status = useValidateImageURL(src);
  const [didMount, setDidMount] = React.useState(false);

  React.useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);
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
    else if (status === 'valid')
      return (
        <div className={`${className ? className : ''}`}>
          <img src={src} alt={alt} />
        </div>
      );
    return null;
  };

  if (!didMount) {
    return null;
  }

  return renderImg();
};

export default CustomImage;
