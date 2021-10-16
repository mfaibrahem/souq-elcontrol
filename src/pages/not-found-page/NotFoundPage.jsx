import './NotFound.styles.scss';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import DocTitleScrollTop from '../../utils/DocTitleScrollTop';
import notFoundImg from '../../assets/imgs/404.png';
import routerLinks from '../../components/app/routerLinks';
import './NotFound.styles.scss';

const NotFoundPage = () => {
  DocTitleScrollTop('Not Found');

  return (
    <div className="page-me custom-not-found-page">
      <div className="mfa-container">
        <div className="error-wrapper">
          <div className="err-img not-found">
            <img src={notFoundImg} alt="Not found page" />
          </div>

          <div className="err-text">
            <h1>Oops...page not found</h1>
            <p>Do not worry. Back to home previous pages</p>
          </div>

          <RouterLink to={routerLinks.homePage} className="home-btn">
            {' '}
            Back to home{' '}
          </RouterLink>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
