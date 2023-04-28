/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routerLinks from '../../components/app/routerLinks';
import SharedSlider from '../../components/shared-slider/SharedSlider';
import useSlider from '../../custom-hooks/useSlider';
import './HomeSlider.scss';

const HomeSlider = () => {
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
    autoplay: true,
    // rtl: sliderDir === 'rtl' ? true : false,
    infinite: true,
    speed: 1000,
    // autoplaySpeed: 1000,
    cssEase: 'ease-in-out',
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useTransform: false,
    initialSlide: 2,
    lazyLoad: true,
    prevArrow: i18n.dir() === 'rtl' ? <SampleNextArrow /> : <SamplePrevArrow />,
    nextArrow: i18n.dir() === 'rtl' ? <SamplePrevArrow /> : <SampleNextArrow />
  };

  const { isLoadingSlides, allFetchedSlides } = useSlider();

  const [sliderArr, setSliderArr] = useState([]);
  useEffect(() => {
    if (allFetchedSlides?.services?.length > 0) {
      if (allFetchedSlides?.backgrounds?.length > 0) {
        const arr = allFetchedSlides.services.map((obj, index) => {
          return {
            ...obj,
            slideBg: allFetchedSlides.backgrounds[index]?.image || null
          };
        });
        setSliderArr(arr);
      } else {
        setSliderArr(allFetchedSlides.services);
      }
    }
  }, [allFetchedSlides]);

  const renderSingleSlide = (item) => {
    return (
      <div className="slide-wrap" key={item.id}>
        <div
          style={{
            backgroundImage: item?.slideBg ? `url(${item.slideBg})` : '',
            backgroundSize: 'cover'
          }}
        >
          <div className="custom-container">
            <Link
              to={routerLinks?.serviceDetailsRoute(
                item?.mainCat?.id,
                item?.cat?.id,
                item?.car?.id,
                item?.id
              )}
              className="slide-img-wrap"
            >
              <img className="slide-img" src={item.image} alt="slide" />

              <div className="slide-text">
                <div className="custom-container">
                  <div className={`content-wrap ${i18n.dir()}`}>
                    <div className="section-text-wrap">
                      <div
                        className="product-data"
                        style={{
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        <div className="card-name">{item?.name}</div>
                        <div className="cat-sub-cat">
                          <p className="cat-p">{item?.mainCat?.name} / </p>
                          <p className="sub-cat-p">{item?.cat?.name}</p>
                        </div>
                        {item?.price && (
                          <p className="price-p">
                            {item.price} {t('currency.eg')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="btns-links">
                      <Link
                        to={routerLinks?.startSellingRoute}
                        className="shop-link"
                      >
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
            </Link>
          </div>
        </div>
      </div>
    );
  };

  if (allFetchedSlides?.services?.length > 0) {
    return (
      <div className="home-main-section">
        <SharedSlider
          className="custom-slick-slider main-app-slick-slider"
          slides={
            // allFetchedSlides?.services?.length > 0
            //   ? allFetchedSlides.services
            //   : []
            sliderArr?.length > 0 ? sliderArr : []
          }
          settings={sliderSettings}
          renderSingleSlide={renderSingleSlide}
          isLoading={isLoadingSlides}
        />
      </div>
    );
  }

  return null;
};

export default HomeSlider;
