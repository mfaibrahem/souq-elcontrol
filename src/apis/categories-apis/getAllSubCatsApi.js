import axios from 'axios';

const getAllSubCatsApi = async (mainCatId, langIsoCode) => {
  try {
    const url = `/Service/subCat?cat_id=${mainCatId ? mainCatId : ''}`;
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

export default getAllSubCatsApi;
