import axios from 'axios';

const getHomepageMainArticleApi = async (langIsoCode) => {
  try {
    const url = '/main-article';

    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // lang: langIsoCode
      }
    });

    return res;
  } catch (error) {
    throw error;
  }
};

export default getHomepageMainArticleApi;
