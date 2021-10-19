import { Button } from 'antd';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import './CustomSharedBtn.scss';

const CustomSharedBtn = (props) => {
  const { isButton, to, className, children, type, loading } = props;
  if (isButton) {
    return (
      <Button
        loading={loading ? loading : false}
        htmlType={type ? type : 'button'}
        className={`custom-shared-btn ${className ? className : ''}`}
        onClick={props.onClick}
        type="primary"
      >
        {/* <div className="btn-content">
          </div> */}
        {children}
      </Button>
    );
  }
  return (
    <RouterLink
      className={`custom-shared-btn ${className ? className : ''}`}
      to={to}
      onClick={props.onClick}
    >
      {/* {children} */}
      <div className="btn-content">{children}</div>
    </RouterLink>
  );
};

export default CustomSharedBtn;
