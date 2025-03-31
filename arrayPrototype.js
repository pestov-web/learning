Array.prototype.first = function () {
  return this[0];
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.random = function () {
  if (this.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};

const arr = [1, 'some', 3, 4, 5, ['2'], 55];
const emptyArr = [];

console.log(arr.first());
console.log(arr.last());
console.log(arr.random());
console.log(emptyArr.random());
console.log(emptyArr.last());
console.log(emptyArr.first());
