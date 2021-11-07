import axios from 'axios';

export const forgetPasswordApi1 = async (values) => {
  try {
    const res = await axios.post('/enter-email-reset', values, {
      headers: {
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordApi2 = async (values) => {
  const url = `/find-token?token=${values.token ? values.token : ''}&email=${
    values.email ? values.email : ''
  }`;
  try {
    const res = await axios.get(url, {
      headers: {
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordApi3 = async (values) => {
  try {
    const res = await axios.post('/reset-password', values, {
      headers: {
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};
