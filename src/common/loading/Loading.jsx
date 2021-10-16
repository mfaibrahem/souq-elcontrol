import './Loading.styles.scss';
import React from 'react';

import loadingImg from '../../assets/imgs/icons/loading1.gif';

const Loading = () => {
  return (
    <div className="loadingPage">
      <img src={loadingImg} alt="Loading" />
    </div>
  );
};

export default Loading;
