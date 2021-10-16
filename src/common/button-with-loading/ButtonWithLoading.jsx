import './ButtonWithLoading.styles.scss';

import React from 'react';
import { Button } from 'antd';

import loadingImg from '../../assets/imgs/icons/loading.gif';

const ButtonWithLoading = ({
  isSubmitting,
  btnText,
  loadingMsg,
  errors,
  children,
  className,
  ...rest
}) => {
  // console.log(errors);
  // const errorObjIsEmpty = errors ? Object.keys(errors).length === 0 : true;
  const errorObjIsEmpty = errors && Object.keys(errors).length === 0;

  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      disabled={isSubmitting || !errorObjIsEmpty}
      className={`btnWithLoading ${className}`}
      {...rest}>
      {isSubmitting ? (
        <span className="img-msg">
          <img className="loadingImg" src={loadingImg} alt="img" />
          {loadingMsg}
        </span>
      ) : (
        <span>{btnText}</span>
      )}
      {children}
    </Button>
  );
};

export default ButtonWithLoading;
