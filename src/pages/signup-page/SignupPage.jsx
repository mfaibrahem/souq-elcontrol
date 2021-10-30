import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import SignupForm from './SignupForm';
import './SignupPage.scss';

const SignupPage = () => {
  const { t } = useTranslation();

  return (
    <div className="shared-custom-page signup-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.signup'),
            isLink: false
          }
        ]}
      />
      <div className="custom-container">
        <section className="signup-form-section">
          <SignupForm />
        </section>
      </div>
    </div>
  );
};

export default SignupPage;
