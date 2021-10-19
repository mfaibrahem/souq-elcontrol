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

          <div className="contact-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27620.545625113027!2d31.339140799999996!3d30.077909299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1634628095716!5m2!1sar!2seg"
              width="100%"
              height="450"
              loading="lazy"
              title="contact us"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
