function Calculator(startingValue) {
  if (!new.target) {
    throw new Error('необходимо использовать new');
  }

  this.values = [{ value: startingValue }];

  this.plus = function (value) {
    this.values.push({ op: '+', value });
    return this;
  };

  this.minus = function (value) {
    this.values.push({ op: '-', value });
    return this;
  };

  this.multiply = function (value) {
    this.values.push({ op: '*', value });
    return this;
  };

  this.divide = function (value) {
    if (value === 0) throw new Error('Деление на ноль невозможно');
    this.values.push({ op: '/', value });
    return this;
  };

  this.calculate = function () {
    let values = [...this.values];
    // выполняем умножение и деление первым
    let stack = [{ value: values[0].value }];
    for (let i = 1; i < values.length; i++) {
      let { op, value } = values[i];
      switch (op) {
        case '*':
          stack[stack.length - 1].value *= value;
          break;
        case '/':
          stack[stack.length - 1].value /= value;
          break;
        default:
          stack.push({ op, value });
          break;
      }
    }
    // сложение и вычитание
    let result = stack[0].value;
    for (let i = 1; i < stack.length; i++) {
      let { op, value } = stack[i];
      if (op === '+') result += value;
      if (op === '-') result -= value;
    }

    return result;
  };
}

const calculator = new Calculator(2);
console.log(calculator.plus(3).minus(2).multiply(4).divide(2).calculate());
