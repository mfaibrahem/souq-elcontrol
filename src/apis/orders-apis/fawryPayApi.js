import axios from 'axios';

const fawryPayApi = async (paramsFilter, token, langIsoCode) => {
  try {
    const url = `/Fawry/payFawry?order_id=${
      paramsFilter?.order_id ? paramsFilter.order_id : ''
    }`;
    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        lang: langIsoCode
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default fawryPayApi;
