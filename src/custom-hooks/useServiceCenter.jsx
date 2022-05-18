/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import getSingleServiceCenterApi from '../apis/service-centers-apis/getSingleServiceCenterApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useServiceCenter = (centerId) => {
  const { i18n } = useTranslation();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [fetchedCenter, setFetchedCenter] = useState(null);

  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoading(true);
      customApiRequest(
        getSingleServiceCenterApi(params?.centerId || centerId, i18n.language),
        (res) => {
          setIsLoading(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedCenter(res.data.data);
          }
        },
        (error) => {
          setIsLoading(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchCount]);

  return {
    isLoading,
    setIsLoading,
    //
    fetchCount,
    setFetchCount,
    //
    fetchedCenter,
    setFetchedCenter
  };
};

export default useServiceCenter;
