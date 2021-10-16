import axios from 'axios';

const getHomepageVideoApi = async (langIsoCode) => {
  try {
    const url = '/main-videos';

    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: langIsoCode
      }
    });

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default getHomepageVideoApi;
