import axios from 'axios';

export const forgetPasswordEnterEmailApi = async (values) => {
  try {
    const res = await axios.post('/Auth_general/forget_password', values, {
      headers: {
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordEnterCodeApi = async (token, values) => {
  const url = '/Auth_private/check_password_code';
  try {
    const res = await axios.post(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordResendCodeApi = async (token, values) => {
  const url = '/Auth_private/resend_code';
  try {
    const res = await axios.post(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgetPasswordResetPasswordApi = async (token, values) => {
  try {
    const res = await axios.post('/Auth_private/reset_password', values, {
      headers: {
        Authorization: `Bearer ${token}`,
        lang: 'ar'
      }
    });
    return res;
  } catch (error) {
    throw error;
  }
};
