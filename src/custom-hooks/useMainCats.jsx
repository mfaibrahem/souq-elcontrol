import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import getAllMainCatsApi from '../apis/categories-apis/getAllMainCatsApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useMainCats = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [isLoadingMainCats, setIsLoadingMainCats] = useState(false);
  const [fetchMainCatsCount, setFetchMainCatsCount] = useState(0);
  const [allFetchedMainCats, setAllFetchedMainCats] = useState([]);
  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingMainCats(true);
      customApiRequest(
        getAllMainCatsApi(i18n.language),
        (res) => {
          setIsLoadingMainCats(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedMainCats(res.data.data);
          }
        },
        (error) => {
          setIsLoadingMainCats(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchMainCatsCount, pathname]);

  return {
    isLoadingMainCats,
    setIsLoadingMainCats,
    //
    fetchMainCatsCount,
    setFetchMainCatsCount,
    //
    allFetchedMainCats,
    setAllFetchedMainCats
  };
};

export default useMainCats;
