import axios from 'axios';

const signupServiceCenterApi = async (values, token, langIsoCode) => {
  try {
    const res = await axios.post('/Store/createAccountServiceCenter', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        lang: langIsoCode
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default signupServiceCenterApi;
