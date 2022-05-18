/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import getAllServicesApi from '../apis/categories-apis/getAllServicesApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';
import queryString from 'query-string';
import getAllServiceCentersApi from '../apis/service-centers-apis/getAllServiceCentersApi';

const useServiceCenters = (cityId = '') => {
  const { i18n } = useTranslation();
  const params = useParams();
  const [iseLoadingCenters, setIsLoadingCenters] = useState(false);
  const [fetchCentersCount, setFetchCentersCount] = useState(0);
  const [allFetchedCenters, setAllFetchedCenters] = useState([]);
  const [centersPagination, setCentersPagination] = useState(null);
  const customApiRequest = useCustomApiRequest();
  const { search } = useLocation();
  const values = queryString.parse(search);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingCenters(true);
      customApiRequest(
        getAllServiceCentersApi(
          {
            cityId: params?.cityId || cityId,
            ...values
          },
          i18n.language
        ),
        (res) => {
          setIsLoadingCenters(false);
          if (checkRes(res) && res?.data?.data?.data) {
            setAllFetchedCenters(res.data.data.data);
            if (res?.data?.data?.pagination) {
              setCentersPagination(res.data.data.pagination);
            }
          }
        },
        (error) => {
          setIsLoadingCenters(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchCentersCount]);

  return {
    iseLoadingCenters,
    setIsLoadingCenters,
    //
    fetchCentersCount,
    setFetchCentersCount,
    //
    allFetchedCenters,
    setAllFetchedCenters,
    centersPagination
  };
};

export default useServiceCenters;
