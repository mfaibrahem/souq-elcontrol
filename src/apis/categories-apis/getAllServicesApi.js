import axios from 'axios';

const getAllServicesApi = async (filterParams, langIsoCode) => {
  try {
    const url = `/Service/services?cat_id=${
      filterParams?.subCatId ? filterParams.subCatId : ''
    }&car_id=${filterParams?.carId ? filterParams.carId : ''}&page=${
      filterParams?.page ? filterParams.page : 1
    }`;
    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        lang: langIsoCode
      }
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default getAllServicesApi;
