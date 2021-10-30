import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import SigninForm from './SigninForm';
import './SigninPage.scss';

const SigninPage = () => {
  const { t } = useTranslation();

  return (
    <div className="shared-custom-page signin-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.signin'),
            isLink: false
          }
        ]}
      />
      <div className="custom-container">
        <section className="signin-form-section">
          <SigninForm />
        </section>
      </div>
    </div>
  );
};

export default SigninPage;
