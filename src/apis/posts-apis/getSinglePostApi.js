import axios from 'axios';

const getSinglePostApi = async (paramsFilter, langIsoCode) => {
  try {
    const url = `/Blog/singleBlog?blog_id=${paramsFilter?.postId || ''}`;
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

export default getSinglePostApi;
