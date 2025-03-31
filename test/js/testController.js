import { Question, RadioQuestion, CheckboxQuestion } from './question';
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

function TestController(serviceUrl) {
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

  this.addQuestionToList = function (questionObj) {
    this.questionsList.push(questionObj);
  };

  // Создание объекта вопроса
  this.createNextQuestionObject = async function () {
    if (this.questionIndex < this.questionsCount) {
      console.log(`загружаем вопрос по индексу ${this.questionIndex}`);
      const data = await this.loadQuestion(this.questionIndex);
      const questionObj = this.questionFactory(data);
      this.addQuestionToList(questionObj);
      this.questionIndex++;
      questionObj.init(() => {
        this.createNextQuestionObject();
      });
    } else {
      this.showResult();
    }
  };

  this.questionFactory = function (data) {
    const answers = data.answers.split('#;');
    let questionObj;
    if (answers.length === 1) {
      console.log('Радио-вопрос');
      questionObj = new RadioQuestion(data);
    } else {
      console.log('Чекбокс-вопрос');
      questionObj = new CheckboxQuestion(data);
    }
    return questionObj;
  };

  // Метод показа результатов теста
  this.showResult = function () {
    console.log('Показываем результаты...');
  };
}

export default TestController;
