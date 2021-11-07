import axios from 'axios';

const signoutApi = async (token, langIsoCode) => {
  try {
    const signoutRes = await axios.post('/Auth_private/logout', null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        lang: langIsoCode
      }
    });
    return signoutRes;
  } catch (error) {
    throw error;
  }
};

export default signoutApi;
