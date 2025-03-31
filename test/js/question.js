// Конструктор базового вопроса
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

function question(text, options, answers, NextCallback) {
  this.text = text;
  this.options = options;
  this.answers = answers;
  this.NextCallback = NextCallback;
  this.score = 0;

  // Метод вычисления результата
  this.checkAnswers = function (selectedAnswers) {
    // Простая логика: если выбранные ответы совпадают с правильными, начисляем балл
    const correct = this.answers;
    // сравниваем массивы
    if (JSON.stringify(selectedAnswers) === JSON.stringify(correct)) {
      console.log('Правильно!');
      this.score += 1;
    }
    console.log('Результат:', this.score);
  };

  this.getScore = function () {
    return this.score;
  };
  this.renderQuestion = function () {
    // Клонируем шаблон из index.html
    const template = FORM_TEMPLATE.content.cloneNode(true);
    template.querySelector('.question__text').textContent = this.text;

    const optionsList = template.querySelector('.question__options');
    // Рендерим варианты ответа
    this.options.forEach((option, idx) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const label = document.createElement('label');

      // В зависимости от типа вопроса выбираем radio или checkbox
      input.type = this instanceof radioQuestion ? 'radio' : 'checkbox';
      input.name = 'option'; // для radio важно иметь одно имя
      input.value = option;
      input.id = `option${idx}`;

      label.setAttribute('for', `option${idx}`);
      label.textContent = option;

      li.appendChild(input);
      li.appendChild(label);
      optionsList.appendChild(li);
    });

    // Очищаем контейнер и добавляем новый вопрос
    FORM_CONTAINER.innerHTML = '';
    FORM_CONTAINER.appendChild(template);

    // Привязываем обработчик для кнопки «Следующий»
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Следующий';
    nextButton.addEventListener('click', () => this.handleNext(this));
    FORM_CONTAINER.appendChild(nextButton);
  };

  this.handleNext = function () {
    // Получаем выбранные ответы
    const inputs = FORM_CONTAINER.querySelectorAll('input');
    const selectedAnswers = [];
    inputs.forEach((input) => {
      if (input.checked) selectedAnswers.push(input.value);
    });

    this.checkAnswers(selectedAnswers);
    this.NextCallback();
  };
}

// Конструктор для радио-вопроса
function radioQuestion(text, options, answers, NextCallback) {
  this.init = function () {
    this.renderQuestion(this);
  };
}

// Конструктор для чекбокс-вопроса
function checkboxQuestion(text, options, answers, NextCallback) {
  this.init = function () {
    this.renderQuestion(this);
  };
}

export { question, radioQuestion, checkboxQuestion };
