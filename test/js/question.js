// Конструктор базового вопроса
import { FORM_CONTAINER, FORM_TEMPLATE } from './utils/constants';

function Question(data) {
  this.text = data.text;
  this.options = data.options.split('#;');
  this.answers = data.answers.split('#;');
  this.timeout = data.timeout;
  this.score = 0;

  // Метод вычисления результата
  this.getScore = function (selectedAnswers) {
    // Простая логика: если выбранные ответы совпадают с правильными, начисляем балл
    const correct = this.answers;
    // сравниваем
    if (JSON.stringify(selectedAnswers) === JSON.stringify(correct)) {
      console.log('Правильно!');
      return 1;
    }
    console.log('Неправильно!');
    return 0;
  };

  this.handleNext = function (selectedAnswers) {
    // Получаем выбранные ответы
    this.score += this.getScore(selectedAnswers);
    console.log('Результат:', this.score);
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
      input.type = this instanceof RadioQuestion ? 'radio' : 'checkbox';
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
}

// Конструктор для радио-вопроса
function RadioQuestion(data) {
  Question.call(this, data);
  this.init = function (onNext) {
    this.renderQuestion(this, onNext);
  };
}

// Конструктор для чекбокс-вопроса
function CheckboxQuestion(data) {
  Question.call(this, data);
  this.init = function (onNext) {
    this.renderQuestion(this, onNext);
  };
}

export { Question, RadioQuestion, CheckboxQuestion };
