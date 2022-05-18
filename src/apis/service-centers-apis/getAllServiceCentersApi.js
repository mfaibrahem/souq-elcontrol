import axios from 'axios';

const getAllServiceCentersApi = async (filterValues, langIsoCode) => {
  try {
    const url = `/Store/serviceCenters?city_id=${
      filterValues?.cityId || ''
    }&page=${filterValues?.page || 1}`;
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

export default getAllServiceCentersApi;
