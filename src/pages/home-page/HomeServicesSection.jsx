import React from 'react';
import { useTranslation } from 'react-i18next';

const HomeServicesSection = () => {
  const { t } = useTranslation();
  return (
    <section className="home-services-section">
      <div className="custom-container">
        <div className="section-main-title">
          {t('home_services-section.main_title')}
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
