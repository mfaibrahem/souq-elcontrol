import axios from 'axios';

const cancelOrderApi = async (values, token, langIsoCode) => {
  try {
    const signinRes = await axios.post('/Order/cancelOrder', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        lang: langIsoCode
      }
    });
    return signinRes;
  } catch (error) {
    throw error;
  }
};

export default cancelOrderApi;
