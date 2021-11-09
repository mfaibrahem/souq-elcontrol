import axios from 'axios';

const getAllMainCatsApi = async (mainCatId, langIsoCode) => {
  try {
    const url = '/Service/mainCat';
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

export default getAllMainCatsApi;
