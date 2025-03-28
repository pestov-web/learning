function Calculator(startingValue) {
  if (!new.target) {
    throw new Error('необходимо использовать new');
  }

  this.expression = [startingValue];

  this.plus = function (value) {
    this.expression.push('+', value);
    return this;
  };

  this.minus = function (value) {
    this.expression.push('-', value);
    return this;
  };

  this.multiply = function (value) {
    this.expression.push('*', value);
    return this;
  };

  this.divide = function (value) {
    if (value === 0) {
      throw new Error('Деление на ноль невозможно');
    }
    this.expression.push('/', value);
    return this;
  };

  this.calculate = function () {
    let result = [...this.expression];
    let i = 0;
    while (result.includes('*' || '/')) {
      if (result[i] === '*') {
        result.splice(i - 1, 3, result[i - 1] * result[i + 1]);
      }
      if (result[i] === '/') {
        result.splice(i - 1, 3, result[i - 1] / result[i + 1]);
      }
      i++;
    }

    i = 0;
    while (result.includes('+' || '-')) {
      if (result[i] === '+') {
        result.splice(i - 1, 3, result[i - 1] + result[i + 1]);
      }
      if (result[i] === '-') {
        result.splice(i - 1, 3, result[i - 1] - result[i + 1]);
      }
      i++;
    }
    return Number(result);
  };
}

const calculator = new Calculator(2);
console.log(calculator.plus(3).minus(2).multiply(4).divide(2).calculate());
