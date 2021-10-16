/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import getAllCategoriesApi from '../apis/categories-apis/getAllCategoriesApis';
import checkRes from '../utils/checkRes';
const useCategories = () => {
  const [allCats, setAllCats] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCats = async () => {
      try {
        const res = await getAllCategoriesApi();

        if (isMounted) {
          // is response is success
          if (checkRes(res) && res.data?.data?.length >= 0) {
            const data = res.data.data;
            setAllCats(data);
          } else {
            //
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();

    return () => {
      isMounted = false;
    };
  }, []);

  return allCats;
};

export default useCategories;
