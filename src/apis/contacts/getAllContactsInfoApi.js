import axios from 'axios';

const getAllContactsApi = async (langIsoCode) => {
  try {
    const res = await axios.get(`/information`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default getAllContactsApi;
