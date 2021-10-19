import React from 'react';
import { useTranslation } from 'react-i18next';
import ContactUsForm from './ContactUsForm';
import './ContactUsSection.scss';

const ContactUsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="contact-us-section">
      <div className="custom-container">
        <p className="main-title">{t('contact_us_section.main_title')}</p>
        <div className="section-content">
          <ContactUsForm />
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
