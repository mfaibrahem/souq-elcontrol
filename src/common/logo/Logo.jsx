import './Logo.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';

const Logo = ({ className, colored }) => {
  return (
    <Link className={className} to={routerLinks.homePage}>
      {!colored ? (
        <img src="/assets/imgs/logo/logo.png" alt="app logo" />
      ) : (
        <img src="/assets/imgs/logo/logo-colored.png" alt="app logo" />
      )}
    </Link>
  );
};

export default Logo;
