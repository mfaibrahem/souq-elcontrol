/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import getAllCarSelectionApi from '../apis/categories-apis/getCarSelectionsApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useCarSelection = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [isLoadingCarSelection, setIsLoadingCarSelection] = useState(false);
  const [fetchSelectionMainCount, setFetchSelectionCount] = useState(0);
  const [allFetchedSelection, setAllFetchedSelection] = useState([]);
  const customApiRequest = useCustomApiRequest();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingCarSelection(true);
      customApiRequest(
        getAllCarSelectionApi(i18n.language),
        (res) => {
          setIsLoadingCarSelection(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedSelection(res.data.data);
          }
        },
        (error) => {
          setIsLoadingCarSelection(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchSelectionMainCount, pathname]);

  return {
    isLoadingCarSelection,
    setIsLoadingCarSelection,
    //
    fetchSelectionMainCount,
    setFetchSelectionCount,
    //
    allFetchedSelection,
    setAllFetchedSelection
  };
};

export default useCarSelection;
