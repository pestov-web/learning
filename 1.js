function Calculator(startingValue) {
  if (!new.target) {
    throw new Error('необходимо использовать new');
  }

  this.expression = startingValue.toString();

  this.plus = function (value) {
    this.expression += `+${value}`;
    return this;
  };

  this.minus = function (value) {
    this.expression += `-${value}`;
    return this;
  };

  this.multiply = function (value) {
    this.expression += `*${value}`;
    return this;
  };

  this.divide = function (value) {
    if (value === 0) {
      throw new Error('Деление на ноль невозможно');
    }
    this.expression += `/${value}`;
    return this;
  };

  this.calculate = function () {
    return Function(`return ${this.expression}`)();
  };
}

const calculator = new Calculator(2);
console.log(calculator.plus(3).minus(2).multiply(4).divide(2).calculate());
