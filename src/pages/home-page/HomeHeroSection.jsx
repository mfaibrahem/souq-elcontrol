import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import mainAppBarLinks from '../../components/main-app-bar/mainAppBarLinks';
import heroBg1 from '../../assets/imgs/hero-section/hero-left-bg.svg';
import heroBg2 from '../../assets/imgs/hero-section/hero-right-bg.svg';
import heroImg from '../../assets/imgs/hero-section/hero-img.png';
import './HomeHeroSections.scss';

const HomeHeroSection = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t).map(({ id, name, link }) => (
          <li key={id}>
            <NavLink
              activeClassName={`active-link`}
              className={
                slugify(pathname).includes('blogs') && id === 6
                  ? 'active-link'
                  : ''
              }
              to={link}
              exact
            >
              {name}
              <div className="active-img-wrap"></div>
            </NavLink>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <section className="home-hero-section">
      <div className="hero-bg left-bg">
        <img src={heroBg1} alt="bg" />
      </div>
      <div className="hero-bg right-bg">
        <img src={heroBg2} alt="bg" />
      </div>
      <div className="custom-container">{renderNavLinks()}</div>

      <div className="custom-container">
        <div className="section-data">
          <div className="section-text-wrap">
            <div className="main-title">
              <h1>أصلح سيارتك بسهولة</h1>
              <h1>
                مع سوق <span>الكنترول</span>
              </h1>
            </div>
            <p className="sub-title">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد النص العربى
            </p>
          </div>
          <div className="section-img-wrap">
            <img src={heroImg} alt="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
