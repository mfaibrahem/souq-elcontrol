/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import getAllSubCatsApi from '../apis/categories-apis/getAllSubCatsApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useSubCats = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const params = useParams();
  const [isLoadingSubCats, setIsLoadingSubCats] = useState(false);
  const [fetchSubCatsCount, setFetchSubCatsCount] = useState(0);
  const [allFetchedSubCats, setAllFetchedSubCats] = useState([]);
  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingSubCats(true);
      customApiRequest(
        getAllSubCatsApi(params?.categoryId, i18n.language),
        (res) => {
          setIsLoadingSubCats(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedSubCats(res.data.data);
          }
        },
        (error) => {
          setIsLoadingSubCats(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchSubCatsCount, pathname]);

  return {
    isLoadingSubCats,
    setIsLoadingSubCats,
    //
    fetchSubCatsCount,
    setFetchSubCatsCount,
    //
    allFetchedSubCats,
    setAllFetchedSubCats
  };
};

export default useSubCats;
