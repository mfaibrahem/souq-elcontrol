import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import getAllServicesApi from '../apis/categories-apis/getAllServicesApi';
import checkRes from '../utils/checkRes';
import useCustomApiRequest from './useCustomApiRequest';
import queryString from 'query-string';

const useServices = () => {
  const { i18n } = useTranslation();
  const params = useParams();
  const [iseLoadingServices, setIsLoadingServices] = useState(false);
  const [fetchServicesCount, setFetchServicesCount] = useState(0);
  const [allFetchedServices, setAllFetchedServices] = useState([]);
  const [servicesPagination, setServicesPagination] = useState(null);
  const customApiRequest = useCustomApiRequest();
  const { search } = useLocation();
  const values = queryString.parse(search);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setIsLoadingServices(true);
      customApiRequest(
        getAllServicesApi(
          {
            subCatId: params?.subCategoryId,
            carId: params?.carId,
            ...values
          },
          i18n.language
        ),
        (res) => {
          setIsLoadingServices(false);
          if (checkRes(res) && res?.data?.data) {
            setAllFetchedServices(res.data.data);
            if (res?.data?.data?.services?.pagination) {
              setServicesPagination(res.data.data.services.pagination);
            }
          }
        },
        (error) => {
          setIsLoadingServices(false);
        }
      );
    }

    return () => {
      isMounted = false;
    };
  }, [i18n.language, fetchServicesCount]);

  return {
    iseLoadingServices,
    setIsLoadingServices,
    //
    fetchServicesCount,
    setFetchServicesCount,
    //
    allFetchedServices,
    setAllFetchedServices,
    servicesPagination
  };
};

export default useServices;
