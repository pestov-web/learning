// Конструктор базового вопроса
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

function question(text, options, answers, timeout) {
  this.text = text;
  this.options = options;
  this.answers = answers;
  this.timeout = timeout;
  this.score = 0;

  this.getScore = function (selectedAnswers) {};
  this.renderQuestion = function (questionObj) {};
  this.handleNext = function (questionObj) {};
}

// Конструктор радио-вопроса
function radioQuestion(text, options, answers, timeout) {}

// Конструктор чекбокс-вопроса
function checkboxQuestion(text, options, answers, timeout) {}

export { radioQuestion, checkboxQuestion };
