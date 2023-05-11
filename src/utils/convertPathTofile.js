const convertPathToFile = async (filePath) => {
  try {
    const response = await fetch(`${filePath}`);
    let myBlob = await response.blob();
    // or using axios
    // const res = await axios.get(`https://beta.wzzaa.com/${filePath}`, {
    // 	responseType: 'blob'
    // });
    // let axiosBlob = await res.data;
    // console.log(axiosBlob, 'axios blob');

    myBlob.path = filePath;
    const myFile = new File([myBlob], `path_image${new Date()}.jpeg`, {
      type: 'image/jpeg',
      lastModified: new Date(),
      size: 2
    });
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      Object.assign(myFile, {
        preview: reader.result
      });
    });
    reader.readAsDataURL(myFile);

    return myFile;
  } catch (e) {
    // console.log(e);
  }
};

export default convertPathToFile;
