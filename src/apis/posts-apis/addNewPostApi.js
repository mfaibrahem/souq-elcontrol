import axios from 'axios';

const addNewPostApi = async (values, token, langIsoCode, edit = false) => {
  const url = edit ? '/Blog/editBlog' : '/Blog/addBlog';

  try {
    const signinRes = await axios.post(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        lang: langIsoCode
      }
    });
    return signinRes;
  } catch (error) {
    throw error;
  }
};

export default addNewPostApi;
