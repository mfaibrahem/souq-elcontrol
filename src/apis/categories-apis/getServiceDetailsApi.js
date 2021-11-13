import axios from 'axios';

const getServiceDetailsApi = async (serviceId, langIsoCode) => {
  try {
    const url = `/Service/singleService?service_id=${
      serviceId ? serviceId : ''
    }`;
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

export default getServiceDetailsApi;
