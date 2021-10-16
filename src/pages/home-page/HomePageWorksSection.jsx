import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import { useTranslation } from 'react-i18next';
import getHomepageWorksApi from '../../apis/homepage/getHomepageWorksApi';
import checkRes from '../../utils/checkRes';
import './HomePageWorksSection.scss';

const PhotoItem = ({ image, thumb, group }) => (
  <div className="photo-item">
    <LightgalleryItem group={group} src={image} thumb={thumb}>
      <img data-aos="fade" src={image} style={{ width: '100%' }} alt="item" />
    </LightgalleryItem>
  </div>
);

const HomePageWorksSection = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [worksData, setWorksData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getHomepageWorksApi(i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data?.data;
            setWorksData(data);
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
  }, [i18n.language]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 332
        }}
      >
        <Spin />
      </div>
    );
  }

  if (worksData?.length > 0)
    return (
      <div className="custom-container works-section-wrapper">
        <div className="bold-font section-title">
          بعض من أعمــال دار الفرحـــة
        </div>
        <div className="homepage-works-section">
          <LightgalleryProvider>
            {worksData.map((p, idx) => (
              <PhotoItem key={idx} image={p.image} group="group1" />
            ))}
          </LightgalleryProvider>
        </div>
      </div>
    );

  return null;
};

export default HomePageWorksSection;
