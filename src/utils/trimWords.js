function trimWords(str, count) {
  const allWordsArr = str.split(' ').filter(function (n) {
    return n !== '';
  });
  const slicedArr = allWordsArr.slice(0, count);
  return slicedArr.join(' ');
}
export default trimWords;
