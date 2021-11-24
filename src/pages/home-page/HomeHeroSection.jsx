import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import mainAppBarLinks from '../../components/main-app-bar/mainAppBarLinks';
import heroBg1 from '../../assets/imgs/hero-section/hero-left-bg.svg';
import heroBg2 from '../../assets/imgs/hero-section/hero-right-bg.svg';
import heroImg from '../../assets/imgs/hero-section/hero-img.png';
import './HomeHeroSections.scss';
import UserContext from '../../contexts/user-context/UserProvider';

const HomeHeroSection = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const { user } = useContext(UserContext);
  const renderNavLinks = () => {
    return (
      <ul>
        {mainAppBarLinks(t, user).map(({ id, name, link }) => (
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
              <h1
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}
              >
                <span className={i18n.language}>
                  {t('hero_section.main_title.souq1')}
                </span>
                <span className={i18n.language}>
                  {t('hero_section.main_title.souq2')}{' '}
                </span>
                <span>{t('hero_section.main_title.control')}</span>
              </h1>
              <h1>{t('hero_section.main_title.h1')}</h1>
            </div>
            <p className="sub-title">{t('hero_section.sub_title.h1')}</p>
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
