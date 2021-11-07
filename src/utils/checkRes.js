const checkRes = (res) => {
  return res?.status === 200 && res?.data?.status === 1;
};

export default checkRes;
