/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import getAllRealestatesApi from '../../apis/realestates-apis/getAllRealestatesApis';
import checkRes from '../../utils/checkRes';
import RealestateCard from './RealestateCard';
import { Spin, Pagination } from 'antd';
import routerLinks from '../../components/app/routerLinks';
import './RealestateInvestementPage.scss';
import RealestatePageFilter from './RealestatePageFilter';

const RealestateInvestementPage = () => {
  const { i18n } = useTranslation();
  const { search } = useLocation();
  const values = queryString.parse(search);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [allFetchedRealestates, setAllFetchedRealestates] = useState([]);
  const [realestatePagination, setRealestatePagination] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getAllRealestatesApi({ ...values }, i18n.language);
        if (isMounted) {
          // is response is success
          if (checkRes(res)) {
            const data = res.data?.data?.data;
            if (data?.length > 0) setAllFetchedRealestates(data);
            if (res?.data?.data?.pagination)
              setRealestatePagination(res.data.data.pagination);

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
  }, [i18n.language, fetchCount]);

  // console.log('all fetched : ', allFetchedRealestates);
  // console.log('pagination : ', realestatePagination);

  const renderRealestates = () => {
    return (
      <ul className="realestates-ul">
        {allFetchedRealestates.map((item) => (
          <RealestateCard key={item.id} {...item} />
        ))}
      </ul>
    );
  };
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
    if (allFetchedRealestates?.length > 0)
      return (
        <>
          {renderRealestates()}

          <Pagination
            defaultCurrent={1}
            // current={ordersPagination.current_page}
            pageSize={realestatePagination.per_page}
            total={realestatePagination.total}
            // itemRender={itemRender}
            onChange={(page, pageSize) => {
              setFetchCount((prev) => prev + 1);
              history.push(
                `${routerLinks.realestateInvestementPage}?page=${page}`
              );
            }}
            hideOnSinglePage={true}
          />
        </>
      );
    if (allFetchedRealestates?.length === 0)
      return <h1 style={{ textAlign: 'center' }}>لا توجد عقارات متاحة!!!</h1>;
    return null;
  };
  return (
    // <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
    <div className="custom-container">
      <div className="realestate-investement-page shared-custom-page">
        <h1 className="page-main-title bold-font">التسويق العقـــارى</h1>
        <RealestatePageFilter
          setIsLoading={setIsLoading}
          setAllFetchedRealestates={setAllFetchedRealestates}
          setRealestatePagination={setRealestatePagination}
        />
        {renderPageContent()}
      </div>
    </div>
  );
};

export default RealestateInvestementPage;
