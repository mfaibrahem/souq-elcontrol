import axios from 'axios';

const getAllCategoriesApi = async () => {
  try {
    const res = await axios.get(`/categories`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default getAllCategoriesApi;
