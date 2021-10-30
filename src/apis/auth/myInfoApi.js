import axios from 'axios';

const myInfoApi = async (token, langIsoCode) => {
  try {
    const res = await axios.get('/Auth_private/my_info', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'applications/json',
        Authorization: 'Bearer ' + token,
        lang: langIsoCode
      }
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default myInfoApi;
