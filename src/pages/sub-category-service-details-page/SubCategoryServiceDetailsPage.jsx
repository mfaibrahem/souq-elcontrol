import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';
import { Link as RouterLink, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import sImg from '../../assets/imgs/services/service-img.jpg';
import CustomImage from '../../common/custom-image/CustomImage';
import routerLinks from '../../components/app/routerLinks';
import checkRes from '../../utils/checkRes';
import images from './imagesArr';
import './SubCategoryServiceDetailsPage.scss';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SubCategoryServiceDetailsPage = () => {
  const params = useParams();
  const { i18n, t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  React.useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let res;
        await sleep(1000);
        setFetchedData([
          {
            id: 1,
            image: sImg,
            name: ' كنترول 8.9.MEDG17 Bايمو اوف كيا سبورتاح 2019',
            price: 250
          },
          {
            id: 2,
            image: sImg,
            name: ' كنترول 8.9.MEDG17 Bايمو اوف كيا سبورتاح 2019',
            price: 250
          },
          {
            id: 3,
            image: sImg,
            name: ' كنترول 8.9.MEDG17 Bايمو اوف كيا سبورتاح 2019',
            price: 250
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

  return (
    <div className="shared-custom-page sub-categories-page">
      <section className="sub-categories-section">
        <div className="custom-container">
          <p className="main-title">{t('categories_section.main_title')}</p>
          <ImageGallery items={images} />
        </div>
      </section>
    </div>
  );
};

export default SubCategoryServiceDetailsPage;
