import axios from 'axios';

const getAllCarsApi = async (mainCatId, langIsoCode) => {
  try {
    const url = `/Service/cars`;
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
