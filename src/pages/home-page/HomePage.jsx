/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import './HomePage.scss';
import HomeHeroSection from './HomeHeroSection';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import FeaturedSection from './FeaturedSection';
import HowItWorksSection from './HowItWorksSection';
import QuestionsSection from './QuestionsSection';
import ContactUsSection from './ContactUsSection';

const HomePage = () => {
  return (
    <div className="home-page shared-custom-page">
      <div className="home-page-main-content">
        <HomeHeroSection />
      </div>

      <CategoriesSection />
      <FeaturedSection />
      <HowItWorksSection />
      <QuestionsSection />
      <ContactUsSection />
    </div>
  );
};

export default HomePage;
