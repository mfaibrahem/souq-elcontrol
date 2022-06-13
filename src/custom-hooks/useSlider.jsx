/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import getSlidesApi from '../apis/getSlidesApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';

const useSlider = () => {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [isLoadingSlides, setIsLoadingSlides] = useState(false);
  const [fetchSlidesCount, setFetchSlidesCount] = useState(0);
  const [allFetchedSlides, setAllFetchedSlides] = useState([]);
  const customApiRequest = useCustomApiRequest();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingSlides(true);
      customApiRequest(
        getSlidesApi(i18n.language),
        (res) => {
          setIsLoadingSlides(false);
          if (
            checkRes(res) &&
            res?.data?.data?.services?.length > 0 &&
            res?.data?.data?.backgrounds?.length >= 0
          ) {
            const dataArr = res.data.data.services;
            const bgArr = res?.data?.data.backgrounds;

            setAllFetchedSlides(
              dataArr.map((item, index) => {
                return {
                  ...item,
                  backGroundImage: bgArr[index]?.image
                };
              })
            );
          }
        },
        (error) => {
          setIsLoadingSlides(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchSlidesCount, pathname]);

  return {
    isLoadingSlides,
    setIsLoadingSlides,
    //
    fetchSlidesCount,
    setFetchSlidesCount,
    //
    allFetchedSlides,
    setAllFetchedSlides
  };
};

export default useSlider;
