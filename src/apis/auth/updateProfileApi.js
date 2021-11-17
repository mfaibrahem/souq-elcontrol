import axios from 'axios';

const updateProfileApi = async (token, values) => {
  try {
    const res = await axios.post('/Auth_private/edit_profile', values, {
      headers: {
        lang: 'ar',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default updateProfileApi;
