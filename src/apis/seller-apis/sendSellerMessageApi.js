import axios from 'axios';

const sendSellerMessage = async (values, token, langIsoCode) => {
  try {
    const signinRes = await axios.post('/Inquire/sendMessage', values, {
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

export default sendSellerMessage;
