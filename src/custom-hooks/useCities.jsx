import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import getCitiesApi from '../apis/getCitiesApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useCities = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [fetchCitiesCount, setFetchCitiesCount] = useState(0);
  const [allFetchedCities, setAllFetchedCities] = useState([]);
  const customApiRequest = useCustomApiRequest();
  const params = useParams();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingCities(true);
      customApiRequest(
        getCitiesApi(params?.categoryId, i18n.language),
        (res) => {
          setIsLoadingCities(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedCities(res.data.data);
          }
        },
        (error) => {
          setIsLoadingCities(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchCitiesCount, pathname]);

  return {
    isLoadingCities,
    setIsLoadingCities,
    //
    fetchCitiesCount,
    setFetchCitiesCount,
    //
    allFetchedCities,
    setAllFetchedCities
  };
};

export default useCities;
