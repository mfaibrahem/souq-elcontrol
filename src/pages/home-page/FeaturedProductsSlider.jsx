/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import useSlider from '../../custom-hooks/useSlider';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
import './FeaturedProductsSlider.scss';
import servicesRouterLinks from '../../components/app/services-routes/servicesRouterLinks';
import CustomImage from '../../common/custom-image/CustomImage';
import { useEffect, useState } from 'react';

const FeaturedProductsSlider = () => {
  // SlickSliderBtns('trendy-products-slider', false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { isLoadingSlides, allFetchedSlides } = useSlider();

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <div className="btn-content">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.439 9.47487L5.025 13.0609C5.30639 13.3421 5.68799 13.5001 6.08585 13.5C6.48371 13.4999 6.86524 13.3418 7.1465 13.0604C7.42776 12.779 7.58572 12.3974 7.58563 11.9995C7.58553 11.6017 7.42739 11.2201 7.146 10.9389L4.707 8.49987L13.5 8.49987C13.8978 8.49987 14.2794 8.34184 14.5607 8.06053C14.842 7.77923 15 7.3977 15 6.99987C15 6.60205 14.842 6.22052 14.5607 5.93921C14.2794 5.65791 13.8978 5.49987 13.5 5.49987L4.707 5.49987L7.146 3.06087C7.42739 2.77961 7.58553 2.39809 7.58563 2.00023C7.58572 1.60237 7.42776 1.22077 7.1465 0.939375C6.86524 0.65798 6.48371 0.49984 6.08585 0.499746C5.68799 0.499653 5.30639 0.657611 5.025 0.938873L1.439 4.52487C0.783767 5.18191 0.415813 6.07196 0.415813 6.99987C0.415813 7.92779 0.783767 8.81784 1.439 9.47487Z"
              fill="#43116F"
            />
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
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.561 4.52513L9.975 0.939127C9.69361 0.657865 9.31201 0.499906 8.91415 0.5C8.51629 0.500094 8.13476 0.658232 7.8535 0.939627C7.57224 1.22102 7.41428 1.60262 7.41437 2.00048C7.41447 2.39834 7.57261 2.77986 7.854 3.06113L10.293 5.50013H1.5C1.10218 5.50013 0.720644 5.65816 0.43934 5.93947C0.158035 6.22077 0 6.6023 0 7.00013C0 7.39795 0.158035 7.77948 0.43934 8.06079C0.720644 8.34209 1.10218 8.50013 1.5 8.50013H10.293L7.854 10.9391C7.57261 11.2204 7.41447 11.6019 7.41437 11.9998C7.41428 12.3976 7.57224 12.7792 7.8535 13.0606C8.13476 13.342 8.51629 13.5002 8.91415 13.5003C9.31201 13.5003 9.69361 13.3424 9.975 13.0611L13.561 9.47513C14.2162 8.81809 14.5842 7.92804 14.5842 7.00013C14.5842 6.07221 14.2162 5.18216 13.561 4.52513Z"
              fill="#43116F"
            />
          </svg>
        </div>
      </div>
    );
  }

  const [sliderDir, setSliderDir] = useState(i18n.dir());

  useEffect(() => {
    setSliderDir(i18n.dir());
  }, [i18n.language]);

  const sliderSettings = {
    fade: false,
    arrows: true,
    dots: true,
    rtl: true,
    // rtl: sliderDir === 'rtl' ? true : false,
    lazyLoad: true,
    currentSlide: 0,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    speed: 3400,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />
  };

  const renderSingleSlide = (item) => {
    return (
      <div key={item?.id} className="slide-wrapper">
        <div className="featured-product-card">
          <CustomImage className="product-img" src={item?.image} />
          <div className="product-data">
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
            <RouterLink
              className="product-link"
              to={servicesRouterLinks?.serviceDetailsRoute(
                item?.mainCat?.id,
                item?.cat?.id,
                item?.car?.id,
                item?.id
              )}
            >
              {t('hero_section.detailsTitle')}
            </RouterLink>
          </div>
        </div>
      </div>
    );
  };

  const renderSlides = () => {
    if (isLoadingSlides)
      return (
        <Slider
          className={`${i18n.dir()} custom-slick-slider`}
          {...sliderSettings}
          // nextArrow={<SampleNextArrow />}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 332
              }}
            >
              <LoadingOutlined style={{ fontSize: 20 }} />
            </div>
          </div>
        </Slider>
      );
    if (allFetchedSlides?.length > 0)
      return (
        <div dir="rtl" className="custom-container">
          <Slider
            className={`${i18n.dir()} custom-slick-slider featured-slider`}
            {...sliderSettings}
          >
            {allFetchedSlides?.length > 0 &&
              allFetchedSlides.map((item) => renderSingleSlide(item))}
          </Slider>
        </div>
      );
    return null;
  };

  return (
    <div className={`featured-slider-wrapper ${i18n.dir()}`}>
      {renderSlides()}
    </div>
  );
};

export default FeaturedProductsSlider;
