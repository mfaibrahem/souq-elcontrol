import axios from 'axios';

const ceateNewCategoryApi = async (token, values, edit = false) => {
  try {
    const url = '/save-category';
    // if (!edit) url = '/save-product';
    // else url = '/User/update';
    const res = await axios.post(url, values, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
        lang: 'ar'
      }
    });

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default ceateNewCategoryApi;
