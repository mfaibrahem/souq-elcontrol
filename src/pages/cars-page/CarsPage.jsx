import React, { useState, useEffect } from 'react';
import kiaImg from '../../assets/imgs/services/kia.jpg';
import hundaImg from '../../assets/imgs/services/hyundai.jpg';
import mercImg from '../../assets/imgs/services/hyundai.jpg';
import { useTranslation } from 'react-i18next';
import checkRes from '../../utils/checkRes';
import { Spin } from 'antd';
import './CarsPage.scss';
import CarCard from './CarCard';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CarsPage = () => {
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let res;
        await sleep(1000);
        setFetchedData([
          {
            id: 1,
            image: kiaImg,
            name: 'Kia'
          },
          {
            id: 2,
            image: hundaImg,
            name: 'Hundai'
          },
          {
            id: 3,
            image: mercImg,
            name: 'Mercedis'
          }
        ]);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            if (data) setFetchedData(data);
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

  const renderSubCategoriesUl = () => {
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

    if (fetchedData?.length === 0) return 'No found categories';
    else if (fetchedData?.length > 0) {
      return (
        <ul className="cars-ul">
          {fetchedData.map((ele) => {
            return <CarCard key={ele.id} {...ele} />;
          })}
        </ul>
      );
    }
  };

  return (
    <div className="shared-custom-page cars-page">
      <section className="cars-section">
        <div className="custom-container">
          <p className="main-title">{t('categories_section.main_title')}</p>
          {renderSubCategoriesUl()}
        </div>
      </section>
    </div>
  );
};

export default CarsPage;
