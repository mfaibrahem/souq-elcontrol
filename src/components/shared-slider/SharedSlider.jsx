/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SlickSliderBtns from '../../utils/SlickSliderBtns';
import { Spin } from 'antd';
import './SharedSlider.scss';

const SharedSlider = ({ isLoading, slides }) => {
  const { i18n } = useTranslation();
  const [sliderDir, setSliderDir] = useState(i18n.dir());

  SlickSliderBtns('main-app-slick-slider', isLoading);
  useEffect(() => {
    setSliderDir(i18n.dir());
  }, [i18n.language]);

  const settings = {
    fade: true,
    dots: true,
    arrows: true,
    rtl: sliderDir === 'rtl' ? true : false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0
  };

  const renderSlides = () => {
    if (isLoading)
      return (
        <Slider
          className="main-app-slick-slider custom-slick-slider"
          {...settings}
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
    if (slides?.length > 0)
      return (
        <Slider
          className="main-app-slick-slider custom-slick-slider"
          {...settings}
        >
          {slides?.length > 0 &&
            slides.map((item) => (
              <RouterLink className="slide-wrap" key={item.id} to="/">
                <img className="slide-img" src={item.image} alt="slide" />
              </RouterLink>
            ))}
        </Slider>
      );
    return null;
  };

  return renderSlides();
};

export default SharedSlider;
