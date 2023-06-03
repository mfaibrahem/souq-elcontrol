import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';
import routerLinks from '../../components/app/routerLinks';
import './ProfilePage.scss';
import ProfilePageForm from './ProfilePageForm';

const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <div className="shared-custom-page profile-page">
      <CustomBreadcrubm
        arr={[
          {
            title: t('breadcrumb_section.home'),
            isLink: true,
            to: routerLinks.homePage
          },
          {
            title: t('breadcrumb_section.profile'),
            isLink: false
          }
        ]}
      />
      <div className="custom-container">
        <div className="page-head-wrap">
          <div className="page-title">
            <h2 className="bold-font">{t('userProfile')}</h2>
          </div>
        </div>

        <div className="img-form-wrap">
          <ProfilePageForm />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
