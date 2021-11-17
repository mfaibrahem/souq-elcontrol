import axios from 'axios';

const getAllSellerMessagesApi = async (paramsFilter, token, langIsoCode) => {
  try {
    const url = `/Inquire/myInquires?store_id=${
      paramsFilter?.store_id ? paramsFilter.store_id : ''
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

export default getAllSellerMessagesApi;
