/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import './HomePage.scss';
import { useTranslation } from 'react-i18next';
import HomeHeroSection from './HomeHeroSection';

const HomePage = () => {
  const { i18n } = useTranslation();

  return (
    <div className="home-page shared-custom-page">
      <div className="home-page-main-content">
        <HomeHeroSection />
      </div>
    </div>
  );
};

export default HomePage;
