const checkRes = (res) => {
  return res?.status === 200 && res?.data?.status === 1;
};

const checkUnAuthenticated = (res) => {
  return res?.status === 401;
};

export default checkRes;

export const customApiRequest = async (
  req,
  successCallback,
  unAuthCallback,
  errorCallback
) => {
  try {
    const res = await req;
    console.log('custom res : ', res);
    if (checkRes(res)) {
      successCallback &&
        typeof successCallback === 'function' &&
        successCallback(res);
    } else if (checkUnAuthenticated(res)) {
      unAuthCallback &&
        typeof unAuthCallback === 'function' &&
        unAuthCallback();
    }
  } catch (error) {
    errorCallback &&
      typeof errorCallback === 'function' &&
      errorCallback(error);
  }
};
