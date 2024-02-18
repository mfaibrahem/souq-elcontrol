import React from 'react';
import { useTranslation } from 'react-i18next';
import featuredImg from '../../assets/imgs/featured-img.png';
import CustomImage from '../../common/custom-image/CustomImage';
import './FeaturedSection.scss';

const FeaturedSection = ({ fetchedData }) => {
  const { t } = useTranslation();

  const renderFeaturedUl = () => {
    if (fetchedData?.length === 0) return 'No found categories';
    else if (fetchedData?.length > 0) {
      return (
        <ul className="featured-ul">
          {fetchedData.map((ele) => {
            return (
              <li key={ele.id} className="featured-li">
                <div className="li-content">
                  <div className="featured-img">
                    <CustomImage src={featuredImg} />
                  </div>
                  <div className="featured-name">{ele?.title}</div>
                  <div className="featured-desc">{ele?.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <section className="featured-section">
      <div className="custom-container">
        <div className="main-title">{t('featured_section.main_title')}</div>

        {renderFeaturedUl()}
      </div>
    </section>
  );
};

export default FeaturedSection;
