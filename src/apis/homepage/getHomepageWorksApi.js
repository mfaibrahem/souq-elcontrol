import axios from 'axios';

const getHomepageWorksApi = async (langIsoCode) => {
  try {
    const url = '/works';

    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: langIsoCode
      }
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default getHomepageWorksApi;
