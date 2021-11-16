import axios from 'axios';

const createStoreApi = async (values, langIsoCode) => {
  try {
    const res = await axios.post('/Store/createAccount', values, {
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

export default createStoreApi;
