/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import HomeHeroSection from './HomeHeroSection';
import CategoriesSection from '../../components/categories-section/CategoriesSection';
import FeaturedSection from './FeaturedSection';
import HowItWorksSection from './HowItWorksSection';
import ContactUsSection from './ContactUsSection';
import useCustomApiRequest from '../../custom-hooks/useCustomApiRequest';
import getHomepageDataApi from '../../apis/homepage/getHomepageDataApi';
import checkRes from '../../utils/checkRes';
import { useTranslation } from 'react-i18next';
import './HomePage.scss';
import FeaturedProductsSlider from './FeaturedProductsSlider';
import HomeSlider from './HomeSlider';

const HomePage = () => {
  const { i18n } = useTranslation();
  const [isLoadingHome, setIsLoadingHome] = React.useState(false);
  const [homeData, setHomeData] = React.useState(null);
  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setIsLoadingHome(true);
      customApiRequest(
        getHomepageDataApi(i18n.language),
        (res) => {
          setIsLoadingHome(false);
          if (checkRes(res) && res?.data?.data) {
            setHomeData(res.data.data);
          } else {
          }
        },
        (error) => {
          setIsLoadingHome(false);
        }
      );
    }
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  return (
    <div className="home-page shared-custom-page">
      <div className="home-page-main-content">
        <HomeHeroSection />
      </div>

      <HomeSlider />

      <FeaturedProductsSlider />

      {/* <MainSlider /> */}

      <CategoriesSection
        isLoading={isLoadingHome}
        cats={homeData?.cats}
        isMainCat={true}
        isSubCat={false}
      />
      <FeaturedSection fetchedData={homeData?.Features} />
      <HowItWorksSection
        isLoading={isLoadingHome}
        sectionData={homeData?.howWork}
      />
      <ContactUsSection />
    </div>
  );
};

export default HomePage;
