function question() {
  this.score = 0;
  this.returnScore = function () {
    return this.score;
  };
}

// Конструктор для радио-вопроса
function radioQuestion(num) {
  this.num = num;
  this.score = 5;
}

// Наследуем методы базового класса
radioQuestion.prototype = Object.create(question.prototype);
// radioQuestion.prototype.constructor = radioQuestion;
const que = new question();
const radio = new radioQuestion(1);

console.log(que.returnScore());
