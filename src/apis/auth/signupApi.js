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
    throw new Error(error);
  }
};

export default signupApi;
