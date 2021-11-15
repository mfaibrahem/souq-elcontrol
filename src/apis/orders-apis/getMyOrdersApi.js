import axios from 'axios';

const getMyOrdersApi = async (token, langIsoCode) => {
  try {
    const url = `/Order/myOrders`;
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

export default getMyOrdersApi;
