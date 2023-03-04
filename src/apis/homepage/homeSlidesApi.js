import axios from 'axios';

const getHomeSlidesApi = async (langIsoCode) => {
  try {
    const url = '/slider';
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

export default getHomeSlidesApi;
