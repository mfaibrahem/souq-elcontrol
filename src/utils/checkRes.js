const checkRes = (res) => {
  return (
    res?.status === 200 &&
    res?.data?.success &&
    res?.data?.response_code === 200
  );
};

export default checkRes;
