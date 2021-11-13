import axios from 'axios';

const makeOrderApi = async (values, token, langIsoCode) => {
  try {
    const signinRes = await axios.post('/Order/makeOrder', values, {
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

export default makeOrderApi;
