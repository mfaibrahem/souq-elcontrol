import axios from 'axios';

const getAllCarsApi = async (catId, langIsoCode) => {
  try {
    const url = `/Service/cars?cat_id=${catId || ''}`;
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

export default getAllCarsApi;
