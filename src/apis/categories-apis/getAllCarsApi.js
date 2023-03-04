import axios from 'axios';

const getAllCarsApi = async (catId, carSelectionId, langIsoCode) => {
  try {
    const url = `/Service/cars?cat_id=${catId || ''}&carSection_id=${
      carSelectionId || ''
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

export default getAllCarsApi;
