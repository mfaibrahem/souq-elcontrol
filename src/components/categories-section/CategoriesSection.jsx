import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import CategoriesCard from './CategoriesCard';
import { useTranslation } from 'react-i18next';
import checkRes from '../../utils/checkRes';
import './CategoriesSection.scss';
import categoriesArr from '../../categoriesArr';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const CategoriesSection = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let res;
        await sleep(1000);
        setFetchedData(categoriesArr);
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

  const renderCategoriesUl = () => {
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

    if (fetchedData?.length === 0) return <div>Empty arr</div>;
    else if (fetchedData?.length > 0) {
      return (
        <ul>
          {fetchedData.map((ele) => {
            return <CategoriesCard key={ele.id} {...ele} />;
          })}
        </ul>
      );
    }
  };
  return (
    <section className="categories-section">{renderCategoriesUl()}</section>
  );
};

export default CategoriesSection;
