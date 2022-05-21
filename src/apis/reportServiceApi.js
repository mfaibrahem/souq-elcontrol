import axios from 'axios';

const reportServiceApi = async (values, token, langIsoCode) => {
  try {
    const res = await axios.post('/Service/reportService', values, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export default reportServiceApi;
