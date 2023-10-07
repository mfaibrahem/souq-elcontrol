import axios from 'axios';

const signupApi = async (values, langIsoCode) => {
  try {
    const signinRes = await axios.post('/Auth_general/register', values, {
      headers: {
        Accept: 'application/json',
        lang: langIsoCode
      }
    });
    return signinRes;
  } catch (error) {
    throw error;
  }
};

export default signupApi;




export const registerCheckActiveCode = async (token, values) => {
  const url = '/Auth_private/check_active_code';
  try {
    const res = await axios.post(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};
