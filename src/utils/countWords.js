function countWords(str) {
  return str.split(' ').filter(function (n) {
    return n !== '';
  }).length;
}
export default countWords;
