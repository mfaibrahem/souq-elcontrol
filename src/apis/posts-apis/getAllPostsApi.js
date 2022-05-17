import axios from 'axios';

const getAllPostsApi = async (paramsFilter, langIsoCode) => {
  try {
    const url = `/Blog/getBlog?page=${paramsFilter?.page || 1}&cat_id=${
      paramsFilter?.catId || ''
    }&searchText=${paramsFilter?.searchText || ''}`;
    const res = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        lang: langIsoCode
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export default getAllPostsApi;
