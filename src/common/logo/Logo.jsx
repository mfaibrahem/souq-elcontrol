import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';
import './Logo.scss';

const Logo = ({ className, colored }) => {
  const { i18n } = useTranslation();
  return (
    <Link className={className} to={routerLinks.homePage}>
      {!colored ? (
        i18n.dir() === 'rtl' ? (
          <img src="/assets/imgs/logo/logo.png" alt="app logo" />
        ) : (
          <img src="/assets/imgs/logo/ENG-logo.png" alt="app logo" />
        )
      ) : i18n.dir() === 'rtl' ? (
        <img src="/assets/imgs/logo/logo-colored.png" alt="app logo" />
      ) : (
        <img src="/assets/imgs/logo/ENG-logo-colored.png" alt="app logo" />
      )}
    </Link>
  );
};

export default Logo;
