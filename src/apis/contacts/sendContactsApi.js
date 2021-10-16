import axios from 'axios';

const sendContactsApi = async (values) => {
  try {
    const url = '/contact';
    const res = await axios.post(url, values, {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export default sendContactsApi;
