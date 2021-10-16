/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import SharedSlider from '../../components/shared-slider/SharedSlider';
import HomeAboutSection from './HomeAboutSection';
import VideoSection from './VideoSection';

import './HomePage.scss';
import checkRes from '../../utils/checkRes';
import getHomepageSlidesApi from '../../apis/homepage/getHomepageSlidesApi';
import { useTranslation } from 'react-i18next';
import HomePageWorksSection from './HomePageWorksSection';

const HomePage = () => {
  const { i18n } = useTranslation();
  const [allFetchedSlides, setAllFetchedSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getHomepageSlidesApi(i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data?.data;
            setAllFetchedSlides(data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page shared-custom-page">
      <div className="home-page-main-content">
        <div style={{ backgroundColor: '#fff', paddingBottom: 32 }}>
          <div className="custom-container">
            <SharedSlider slides={allFetchedSlides} isLoading={isLoading} />
          </div>
        </div>
        <div style={{ backgroundColor: '#fff' }}>
          <div className="custom-container">
            <HomeAboutSection />
          </div>
          <VideoSection />
          <HomePageWorksSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
