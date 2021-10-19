import React from 'react';
import { useTranslation } from 'react-i18next';
import howItWorksSectionImg from '../../assets/imgs/how-it-works-img.png';
import CustomImage from '../../common/custom-image/CustomImage';

import './HowItWorksSection.scss';
const arr = [
  {
    id: 1,
    name: 'نبحث عن حل مشكلتك',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  },
  {
    id: 2,
    name: 'نجد المختصين لمساعدتك',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  },
  {
    id: 3,
    name: 'نبحث عن حل مشكلتك',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  },
  {
    id: 4,
    name: 'سهولة الاستخدام ',
    desc: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى'
  }
];
const HowItWorksSection = () => {
  const { t } = useTranslation();
  const renderArr = () => {
    return (
      <ul className="how-it-works-ul">
        {arr?.length > 0 &&
          arr.map((ele, index) => {
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
  return (
    <section className="how-it-works-section">
      <div className="custom-container">
        <p className="main-title">{t('how_it_works_section.main_title')}</p>

        <div className="section-content">
          {renderArr()}
          <div className="section-img">
            <CustomImage src={howItWorksSectionImg} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
