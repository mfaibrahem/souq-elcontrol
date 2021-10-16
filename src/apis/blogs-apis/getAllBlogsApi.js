import axios from 'axios';

const getAllBlogsApi = async (id, filterValues, langIsoCode) => {
  const url = `/blogs/${id}?page=${
    filterValues?.page ? filterValues.page : '1'
  }`;
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

export default getAllBlogsApi;
