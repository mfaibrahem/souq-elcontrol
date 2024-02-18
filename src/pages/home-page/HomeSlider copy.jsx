import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import getHomeSlidesApi from '../../apis/homepage/homeSlidesApi';
import routerLinks from '../../components/app/routerLinks';
import SharedSlider from '../../components/shared-slider/SharedSlider';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import checkRes from '../../utils/checkRes';
import './HomeSlider.scss';

const HomeSlider = () => {
  const sliderRef = useRef();
  const { i18n, t } = useTranslation();
  const [sliderDir, setSliderDir] = useState(i18n.dir());
  useEffect(() => {
    setSliderDir(i18n.dir());
  }, [i18n.dir()]);

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${i18n.dir()}`}
        style={{ ...style }}
        onClick={onClick}
      >
        <div className="btn-content">
          <svg
            width="221"
            height="403"
            viewBox="0 0 221 403"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sc-dkSuNL iqgPbK"
          >
            <path
              d="M216 383.885C221.5 389.385 218.5 395.885 216 398.385C213.5 400.885 206.5 404.385 200.5 398.385L0.99997 216.385L200.5 4.38534C205.5 -0.614703 212 0.385379 216 4.38535C220 8.38531 221.5 17.3853 216 22.8853L29 216.385L216 383.885Z"
              fill="black"
              stroke="none"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${i18n.dir()}`}
        style={{ ...style }}
        onClick={onClick}
      >
        <div className="btn-content">
          <svg
            width="220"
            height="403"
            viewBox="0 0 220 403"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="sc-fxvKuh gVIWpX"
          >
            <path
              d="M4.08419 18.813C-1.41579 13.313 1.58419 6.81288 4.08419 4.31288C6.58419 1.81289 13.5842 -1.68707 19.5842 4.31291L219.084 186.313L19.5842 398.313C14.5842 403.313 8.08416 402.313 4.08419 398.313C0.0842264 394.313 -1.41584 385.313 4.08419 379.813L191.084 186.313L4.08419 18.813Z"
              fill="black"
              stroke="black"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

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
    prevArrow: i18n.dir() === 'rtl' ? <SampleNextArrow /> : <SamplePrevArrow />,
    nextArrow: i18n.dir() === 'rtl' ? <SamplePrevArrow /> : <SampleNextArrow />
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
      <div dir="rtl" className="home-main-section" ref={sliderRef}>
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
