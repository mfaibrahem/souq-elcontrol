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
import QuestionsSection from './QuestionsSection';
import { LoadingOutlined } from '@ant-design/icons';

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

  const renderQuestionsSection = () => {
    if (isLoadingHome) {
      return (
        <div
          style={{
            minHeight: 300,
            display: 'grid',
            placeItems: 'center'
          }}
        >
          <LoadingOutlined style={{ fontSize: 20 }} />
        </div>
      );
    } else if (
      homeData?.question?.length > 0 &&
      homeData.question[0]?.question
    ) {
      return <QuestionsSection questions={homeData?.question} />;
    }
    return null;
  };

  return (
    <div className="home-page shared-custom-page">
      <div className="home-page-main-content">
        <HomeHeroSection />
      </div>

      <HomeSlider />

      {/* <MainSlider /> */}

      <CategoriesSection
        isLoading={isLoadingHome}
        cats={homeData?.cats}
        isMainCat={true}
        isSubCat={false}
      />

      <FeaturedProductsSlider />

      <FeaturedSection fetchedData={homeData?.Features} />
      <HowItWorksSection
        isLoading={isLoadingHome}
        sectionData={homeData?.howWork}
      />
      {renderQuestionsSection()}
      <ContactUsSection />
    </div>
  );
};

export default HomePage;
