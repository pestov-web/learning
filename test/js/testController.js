import { Question, RadioQuestion, CheckboxQuestion } from './question';
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

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
    console.log('Количество вопросов:', count);
    this.questionsCount = count;
    this.questionIndex = 0;
    this.questionsList = [];
    console.log(
      'Инициализация прошла, данные сброшены, вызываем createNextQuestionObject'
    );
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
      console.log(`загружаем вопрос по индексу ${this.questionIndex}`);
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
    RadioQuestion.prototype.constructor = RadioQuestion;

    CheckboxQuestion.prototype = Object.create(Question.prototype);
    CheckboxQuestion.prototype.constructor = CheckboxQuestion;

    const answers = data.answers.split('#;');

    if (answers.length === 1) {
      console.log('Радио-вопрос');
      questionObj = new RadioQuestion(data);
    } else {
      console.log('Чекбокс-вопрос');
      questionObj = new CheckboxQuestion(data);
    }

    console.log('questionObj: ', questionObj);
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
