import Slider from 'react-slick';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import './SharedSlider.scss';

const defaultSettings = {
  // fade: true,
  dots: true,
  arrows: true,
  // rtl: sliderDir === 'rtl' ? true : false,
  // rtl: true,
  // rtl: false,
  rtl: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
  // initialSlide: 0
};

const SharedSlider = ({
  className,
  isLoading,
  slides,
  settings = defaultSettings,
  renderSingleSlide
}) => {
  // SlickSliderBtns('main-app-slick-slider', isLoading);
  const { i18n } = useTranslation();

  const renderSlides = () => {
    if (isLoading)
      return (
        <Slider
          // rtl={i18n.dir() === 'rtl' ? true : false}
          rtl={false}
          className={`${i18n.dir()} custom-slick-slider ${className || ''}`}
          {...settings}
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
    if (slides?.length > 0)
      return (
        <Slider
          rtl={i18n.dir() === 'rtl' ? true : false}
          className={`${i18n.dir()} ${className || 'custom-slick-slider'}`}
          {...settings}
        >
          {slides?.length > 0 && slides.map((item) => renderSingleSlide(item))}
        </Slider>
      );
    return null;
  };

  return renderSlides();
};

export default SharedSlider;
