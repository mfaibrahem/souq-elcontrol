/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import getAllCarsApi from '../apis/categories-apis/getAllCarsApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useCars = () => {
  const { i18n } = useTranslation();
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [fetchCarsCount, setFetchCarsCount] = useState(0);
  const [allFetchedCars, setAllFetchedCars] = useState([]);
  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingCars(true);
      customApiRequest(
        getAllCarsApi(i18n.language),
        (res) => {
          setIsLoadingCars(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedCars(res.data.data);
          }
        },
        (error) => {
          setIsLoadingCars(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchCarsCount]);

  return {
    isLoadingCars,
    setIsLoadingCars,
    //
    fetchCarsCount,
    setFetchCarsCount,
    //
    allFetchedCars,
    setAllFetchedCars
  };
};

export default useCars;
