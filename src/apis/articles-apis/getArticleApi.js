import axios from 'axios';

const getArticleApi = async (id, langIsoCode) => {
  const url = `/articles/${id}`;
  try {
    const res = await axios.get(url, {
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

export default getArticleApi;
