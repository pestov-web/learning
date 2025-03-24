function Calculator(startingValue) {
  if (!new.target) throw new Error('необходимо использовать new');

  this.values = [{ value: startingValue }];

  ['plus', 'minus', 'multiply', 'divide'].forEach((op) => {
    this[op] = (value) => {
      if (op === 'divide' && value === 0)
        throw new Error('Деление на ноль невозможно');
      this.values.push({
        op: { plus: '+', minus: '-', multiply: '*', divide: '/' }[op],
        value,
      });
      return this;
    };
  });

  this.calculate = function () {
    console.log(this.plus);
    let stack = [{ value: this.values[0].value }];
    for (let i = 1; i < this.values.length; i++) {
      let { op, value } = this.values[i];
      if (op === '*' || op === '/') {
        stack[stack.length - 1].value =
          op === '*'
            ? stack[stack.length - 1].value * value
            : stack[stack.length - 1].value / value;
      } else {
        stack.push({ op, value });
      }
    }

    return stack
      .slice(1)
      .reduce(
        (acc, { op, value }) => (op === '+' ? acc + value : acc - value),
        stack[0].value
      );
  };
}

const calculator = new Calculator(2);
console.log(calculator.plus(3).minus(2).multiply(4).divide(2).calculate());
