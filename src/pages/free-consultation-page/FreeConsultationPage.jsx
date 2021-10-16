import React from 'react';
import formImg from '../../assets/imgs/free-consultation/1.jpg';
import Logo from '../../common/logo/Logo';
import FreeConsultationForm from './FreeConsultationForm';
import './FreeConsultationPage.scss';

const FreeConsultationPage = () => {
  return (
    <div className="free-consultation-page shared-custom-page">
      <div className="custom-container" style={{ display: 'grid' }}>
        <div
          className="free-consultation-form-wrap"
          style={{ backgroundImage: `url(${formImg})` }}
        >
          <div className="free-consultation-bg-content-wrap">
            <Logo className="form-logo" />
            <h1 className="form-main-title">طلب استشــارة مجانيــة</h1>
            <FreeConsultationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeConsultationPage;
