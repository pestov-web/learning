function getMiddle(s) {
  result = 0;
  rank = s.length - 1;
  s.forEach((item) => {
    result += item * Math.pow(2, rank);
    rank--;
  });
  return result;
}

console.log(getMiddle([1, 1, 1, 1, 1, 1, 1, 1]));
