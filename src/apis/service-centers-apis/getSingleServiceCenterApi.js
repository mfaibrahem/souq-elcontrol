import axios from 'axios';

const getSingleServiceCenterApi = async (centerId, langIsoCode) => {
  try {
    const url = `/Store/singleServiceCenter?id=${centerId || ''}`;
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

export default getSingleServiceCenterApi;
