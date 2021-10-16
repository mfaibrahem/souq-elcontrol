import { useEffect } from 'react';

const SlickSliderBtns = (sliderClassName, isLoading) => {
  return useEffect(() => {
    if (document.querySelector(`.${sliderClassName}`)) {
      const slider = document.querySelector(`.${sliderClassName}`);
      // console.log(slider);
      if (
        slider.querySelector('button.slick-prev') &&
        slider.querySelector('button.slick-next')
      ) {
        slider.querySelector('button.slick-prev').innerHTML = `
        <div class="btn-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.752" height="9.752" viewBox="0 0 9.752 9.752">
            <path id="Path_578" data-name="Path 578" d="M8.876,4l.859.859-3.4,3.407h7.418V9.485H6.334l3.4,3.407-.859.859L4,8.876Z" transform="translate(-4 -4)"/>
          </svg>
        </div>
        `;
        slider.querySelector('button.slick-next').innerHTML = `
        <div class="btn-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.752" height="9.752" viewBox="0 0 9.752 9.752">
            <path id="Path_578" data-name="Path 578" d="M8.876,4l-.859.859,3.4,3.407H4V9.485h7.418l-3.4,3.407.859.859,4.876-4.876Z" transform="translate(-4 -4)"/>
          </svg>
        </div>
        `;
      }
    }
  }, [sliderClassName, isLoading]);
};

export default SlickSliderBtns;
