import { radioQuestion, checkboxQuestion } from './question';
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

function testController(serviceUrl) {
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
  };

  // Создание объекта вопроса
  this.createNextQuestionObject = function () {
    console.log(`загружаем вопрос по индексу ${this.questionIndex}`);
    const data = this.loadQuestion(this.questionIndex);
    this.questionIndex += 1;
    const options = data.options.split('#;');
    const answers = data.answers.split('#;');
    this.questionFactory(data.text, options, answers, data.timeout);
  };

  this.questionFactory = function (text, options, answers, timeout) {
    console.log('Проверяем вопрос на радио/чекбокс');
    if (answers.length === 1) {
      console.log('Радио-вопрос');
      return new radioQuestion(text, options, answers, timeout);
    } else {
      console.log('Чекбокс-вопрос');
      return new checkboxQuestion(text, options, answers, timeout);
    }
  };

  // Метод показа результатов теста
  this.showResult = function () {};
}

export default testController;
