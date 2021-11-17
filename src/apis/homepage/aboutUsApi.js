import axios from 'axios';

const getAboutUsApi = async (langIsoCode) => {
  try {
    const url = '/siteInfo';
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

export default getAboutUsApi;
