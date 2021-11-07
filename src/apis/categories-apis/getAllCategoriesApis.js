import axios from 'axios';

const getAllCategoriesApi = async () => {
  try {
    const res = await axios.get(`/Service/mainCat`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default getAllCategoriesApi;
