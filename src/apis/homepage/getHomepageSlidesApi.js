import axios from 'axios';

const getHomepageSlidesApi = async (langIsoCode) => {
  try {
    const url = '/slider';

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

export default getHomepageSlidesApi;
