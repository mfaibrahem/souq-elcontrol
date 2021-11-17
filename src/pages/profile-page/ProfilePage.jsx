import React from 'react';
import ProfilePageForm from './ProfilePageForm';
import './ProfilePage.scss';
import routerLinks from '../../components/app/routerLinks';
import { useTranslation } from 'react-i18next';
import CustomBreadcrubm from '../../common/bread-crumb/Breadcrubm';

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
            <h2 className="bold-font">بروفايل المستخدم</h2>
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
