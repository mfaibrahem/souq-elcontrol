import axios from 'axios';

const getAllCarSelectionApi = async (langIsoCode) => {
  try {
    const url = '/Service/CarSections';
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

export default getAllCarSelectionApi;
