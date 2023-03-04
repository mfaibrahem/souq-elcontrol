/* eslint-disable react-hooks/exhaustive-deps */
import { FilterOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import getHomeSlidesApi from '../../apis/homepage/homeSlidesApi';
import routerLinks from '../../components/app/routerLinks';
import SharedSlider from '../../components/shared-slider/SharedSlider';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';

import './HomeSlider.scss';

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <div className="btn-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M11.828 12l2.829 2.828-1.414 1.415L9 12l4.243-4.243 1.414 1.415L11.828 12z" />
        </svg>
      </div>
    </div>
  );
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style }} onClick={onClick}>
      <div className="btn-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
        </svg>
      </div>
    </div>
  );
}

const HomeSlider = () => {
  const sliderRef = useRef();
  const { i18n, t } = useTranslation();
  const [sliderDir, setSliderDir] = useState(i18n.dir());
  useEffect(() => {
    setSliderDir(i18n.dir());
  }, [i18n.dir()]);

  const sliderSettings = {
    fade: false,
    dots: false,
    arrows: true,
    rtl: sliderDir === 'rtl' ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />
  };

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedSlides, setFetchedSlides] = useState(null);
  const customApiRequest = useCustomApiRequest();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getHomeSlidesApi(i18n.language),
        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedSlides(res.data.data);
          } else {
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  const renderSingleSlide = (item) => {
    return (
      <div className="slide-wrap" key={item.id}>
        <img className="slide-img" src={item.image} alt="slide" />
        <div className="slide-text">
          <div className="custom-container">
            <div className={`content-wrap ${i18n.dir()}`}>
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

              <div className="btns-links">
                <Link to={routerLinks?.startSellingRoute} className="shop-link">
                  {t('main_app_bar_links.startSelling')}
                </Link>
                <Link
                  to={routerLinks?.serviceCenterSignupRoute}
                  className="shop-link search-link"
                >
                  {t('main_app_bar_links.serviceCenterSignup')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (fetchedSlides?.backgrounds?.length > 0) {
    return (
      <div className="home-main-section" ref={sliderRef}>
        <SharedSlider
          className="custom-slick-slider main-app-slick-slider"
          slides={
            fetchedSlides?.backgrounds?.length > 0
              ? fetchedSlides.backgrounds
              : []
          }
          settings={sliderSettings}
          renderSingleSlide={renderSingleSlide}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return null;
};

export default HomeSlider;
