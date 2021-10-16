import axios from 'axios';

const getSingleRealestateApi = async (id, langIsoCode) => {
  const url = `/estate/${id}`;
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

export default getSingleRealestateApi;
