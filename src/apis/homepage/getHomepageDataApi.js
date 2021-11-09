import axios from 'axios';

const getHomepageDataApi = async (langIsoCode) => {
  try {
    const url = '/home';
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

export default getHomepageDataApi;
