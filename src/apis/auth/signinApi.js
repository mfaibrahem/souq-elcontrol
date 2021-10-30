import axios from 'axios';

const signinApi = async (values, langIsoCode) => {
  try {
    const signinRes = await axios.post('/Auth_general/login', values, {
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

export default signinApi;
