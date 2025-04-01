import { Question, RadioQuestion, CheckboxQuestion } from './question';
import { FORM_CONTAINER } from './utils/constants';

function TestController(serviceUrl) {
  this.questionsCount = 0;
  this.questionIndex = 0;
  this.questionsList = [];
  this.serviceUrl = serviceUrl;

  this.ajaxToService = async function (endpoint) {
    try {
      const response = await fetch(`${this.serviceUrl}${endpoint}`);
      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      return null;
    }
  };

  // Метод инициализации теста
  this.init = async function () {
    console.log('Инициализация теста...');
    // Запрашиваем количество вопросов
    const count = await this.ajaxToService('TestInit');
    if (count == null) return;
    this.questionsCount = count;
    this.questionIndex = 0;
    this.questionsList = [];
    this.createNextQuestionObject();
  };

  // Загрузка вопроса по индексу
  this.loadQuestion = async function (index) {
    const questionData = await this.ajaxToService(`GetNext/${index}`);
    if (!questionData) return;
    return questionData;
  };

  this.addQuestionToList = function (questionObj) {
    this.questionsList.push(questionObj);
  };

  // Создание объекта вопроса
  this.createNextQuestionObject = async function () {
    if (this.questionIndex < this.questionsCount) {
      const data = await this.loadQuestion(this.questionIndex);
      const questionObj = this.questionFactory(data);
      this.questionIndex++;
    } else {
      this.showResult();
    }
  };

  this.questionFactory = function (data) {
    let questionObj;

    Question.prototype.handleNext = this.createNextQuestionObject.bind(this);
    Question.prototype.addQuestionToList = this.addQuestionToList.bind(this);

    RadioQuestion.prototype = Object.create(Question.prototype);
    CheckboxQuestion.prototype = Object.create(Question.prototype);

    const answers = data.answers.split('#;');

    if (answers.length === 1) {
      questionObj = new RadioQuestion(data);
    } else {
      questionObj = new CheckboxQuestion(data);
    }

    questionObj.init();
    return questionObj;
  };

  // Метод показа результатов теста
  this.showResult = function () {
    const sumOfScores = this.questionsList.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.score;
      },
      0
    );
    FORM_CONTAINER.innerHTML =
      '<h2 class="questions__result">Результат: ' +
      sumOfScores +
      ' из ' +
      this.questionsCount +
      '</h2>';
  };
}

export default TestController;
