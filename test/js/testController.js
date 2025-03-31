import { question, radioQuestion, checkboxQuestion } from './question';
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

function testController(serviceUrl) {
  this.questionsCount = 0;
  this.questionIndex = 0;
  this.questionsList = [];
  this.serviceUrl = serviceUrl;
  this.score = 0;

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

  // Создание объекта вопроса
  this.createNextQuestionObject = async function () {
    if (this.questionIndex < this.questionsCount) {
      console.log(`загружаем вопрос по индексу ${this.questionIndex}`);
      const data = await this.loadQuestion(this.questionIndex);
      this.questionIndex += 1;
      const options = data.options.split('#;');
      const answers = data.answers.split('#;');
      const questionObj = this.questionFactory(
        data.text,
        options,
        answers,
        (questionObj) => this.questionsList.push(questionObj)
      );
      questionObj.renderQuestion(questionObj);
    } else {
      this.showResult();
    }
  };

  this.questionFactory = function (text, options, answers) {
    if (answers.length === 1) {
      console.log('Радио-вопрос');
      return new radioQuestion(
        text,
        options,
        answers,
        this.createNextQuestionObject.bind(this)
      );
    } else {
      console.log('Чекбокс-вопрос');
      return new checkboxQuestion(
        text,
        options,
        answers,
        this.createNextQuestionObject.bind(this)
      );
    }
  };

  // Метод показа результатов теста
  this.showResult = function () {
    console.log('Показываем результаты...');

    console.log('Результат:', this.score);

    const template = FORM_TEMPLATE.content.cloneNode(true);
    template.querySelector(
      '.question__text'
    ).textContent = `ваш результат ${this.score} правильных ответов из ${this.questionsCount}`;
    FORM_CONTAINER.innerHTML = '';
    FORM_CONTAINER.appendChild(template);
  };
}

export default testController;
