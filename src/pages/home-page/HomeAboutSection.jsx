/* eslint-disable react-hooks/exhaustive-deps */
import { Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';
import getHomepageMainArticleApi from '../../apis/homepage/getHomepageMainArticleApi';
import checkRes from '../../utils/checkRes';
import './HomeAboutSection.scss';

const HomeAboutSection = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedAboutData, setFetchedAboutData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getHomepageMainArticleApi(i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            setFetchedAboutData(data);

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
  if (fetchedAboutData)
    return (
      <section className="home-about-section">
        <div className="section-text">
          <div className="section-titles" data-aos="fade-down">
            <p className="bold-font">لماذا دار الفرحة هى الوجهة الأمثل لأفضل</p>
            <p className="bold-font"> خيارات الإيجار فى مصر ؟</p>
          </div>
          <div className="section-data" data-aos="fade-left">
            {fetchedAboutData?.article && parse(fetchedAboutData.article)}
          </div>
        </div>
        <div className="section-imgs">
          {fetchedAboutData.photo1 && (
            <img src={fetchedAboutData.photo1} alt="about1" data-aos="fade" />
          )}
          {fetchedAboutData.photo2 && (
            <img src={fetchedAboutData.photo2} alt="about2" data-aos="fade" />
          )}
          {fetchedAboutData.photo3 && (
            <img src={fetchedAboutData.photo3} alt="about3" data-aos="fade" />
          )}
          {fetchedAboutData.photo4 && (
            <img src={fetchedAboutData.photo4} alt="about4" data-aos="fade" />
          )}
        </div>
      </section>
    );
  return null;
};

export default HomeAboutSection;
