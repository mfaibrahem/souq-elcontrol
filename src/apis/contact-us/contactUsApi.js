import axios from 'axios';

const contactUsApi = async (values, langIsoCode) => {
  try {
    const signinRes = await axios.post('/contactUs', values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        lang: langIsoCode
      }
    });
    return signinRes;
  } catch (error) {
    throw error;
  }
};

export default contactUsApi;
