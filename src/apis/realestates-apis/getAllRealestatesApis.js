import axios from 'axios';

const getAllRealestatesApi = async (filterValues, langIsoCode) => {
  const url = `/estates?page=${
    filterValues?.page ? filterValues.page : '1'
  }&title=${filterValues?.title ? filterValues.title : ''}&rooms=${
    filterValues.rooms ? filterValues.rooms : ''
  }&price=${filterValues?.price ? filterValues.price : ''}&type=${
    filterValues?.type ? filterValues.type : ''
  }`;
  try {
    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllRealestatesApi;
