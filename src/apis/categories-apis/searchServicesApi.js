import axios from 'axios';

const searchServicesApi = async (paramsFilter, langIsoCode) => {
  try {
    const url = `/search?search=${
      paramsFilter?.search ? paramsFilter.search : ''
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

export default searchServicesApi;
