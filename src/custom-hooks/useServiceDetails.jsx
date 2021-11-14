/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import getServiceDetailsApi from '../apis/categories-apis/getServiceDetailsApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useServiceDetails = () => {
  const { i18n } = useTranslation();
  const params = useParams();
  const [isLoadingServiceDetails, setIsLoadingServiceDetails] = useState(false);
  const [fetchServiceDetailsCount, setFetchServiceDetailsCount] = useState(0);
  const [fetchedServiceDetails, setFetchedServiceDetails] = useState(null);

  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingServiceDetails(true);
      customApiRequest(
        getServiceDetailsApi(params?.serviceId, i18n.language),
        (res) => {
          setIsLoadingServiceDetails(false);
          if (checkRes(res) && res?.data?.data) {
            setFetchedServiceDetails(res.data.data);
          }
        },
        (error) => {
          setIsLoadingServiceDetails(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchServiceDetailsCount]);

  return {
    isLoadingServiceDetails,
    setIsLoadingServiceDetails,
    //
    fetchServiceDetailsCount,
    setFetchServiceDetailsCount,
    //
    fetchedServiceDetails,
    setFetchedServiceDetails
  };
};

export default useServiceDetails;
