/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import checkRes from '../../utils/checkRes';
import { Spin } from 'antd';
import getArticleApi from '../../apis/articles-apis/getArticleApi';
import './ArticlesPage.scss';
import ArticleCard from './ArticleCard';

const ArticlesPage = () => {
  const { i18n } = useTranslation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedArticle, setFetchedArticle] = useState(null);

  const { pathname } = useLocation();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getArticleApi(id, i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data;
            if (data) setFetchedArticle(data);
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
  }, [i18n.language, pathname]);

  const renderArticle = () => <ArticleCard {...fetchedArticle} />;
  const renderPageContent = () => {
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
    if (fetchedArticle) return renderArticle();
    if (!fetchedArticle)
      return (
        <h1 style={{ textAlign: 'center', marginTop: 42 }}>
          لا توجد بيانات متاحة!!!
        </h1>
      );
    return null;
  };
  return (
    // <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
    <div className="articles-page shared-custom-page">
      <div className="custom-container">
        <h1 className="page-main-title bold-font">{fetchedArticle?.name}</h1>
        {renderPageContent()}
      </div>
    </div>
  );
};

export default ArticlesPage;
