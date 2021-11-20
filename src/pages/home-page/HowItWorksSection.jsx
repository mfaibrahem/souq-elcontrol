import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import howItWorksSectionImg from '../../assets/imgs/how-it-works-img.png';
import howItWorksSectionImg1 from '../../assets/imgs/how-it-works-img1.png';
import CustomImage from '../../common/custom-image/CustomImage';

import './HowItWorksSection.scss';

const HowItWorksSection = ({ sectionData, isLoading }) => {
  const { t, i18n } = useTranslation();
  const renderArr = () => {
    if (isLoading) {
      return (
        <div
          style={{
            minHeight: 300,
            display: 'grid',
            placeItems: 'center'
          }}
        >
          <LoadingOutlined style={{ fontSize: 20 }} />
        </div>
      );
    }
    if (sectionData?.length > 0)
      return (
        <ul className="how-it-works-ul">
          {sectionData?.length > 0 &&
            sectionData.map((ele, index) => {
              return (
                <li key={ele.id}>
                  <div className="li-number">{index + 1}</div>
                  <div className="li-text">
                    <div className="li-title bold-font">{ele.name}</div>
                    <div className="li-desc">{ele.desc}</div>
                  </div>
                </li>
              );
            })}
        </ul>
      );
  };
  if (sectionData?.length === 0) {
    return null;
  }
  return (
    <section className="how-it-works-section">
      <div className="custom-container">
        <p className="main-title">{t('how_it_works_section.main_title')}</p>

        <div className="section-content">
          {renderArr()}
          <div
            className={
              i18n.dir() === 'rtl' ? 'section-img rtl' : 'section-img ltr'
            }
          >
            <CustomImage
              src={
                i18n.dir() === 'rtl'
                  ? howItWorksSectionImg
                  : howItWorksSectionImg1
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
