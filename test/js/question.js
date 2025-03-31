// Конструктор базового вопроса
function question(text, options, answers, timeout) {
  this.text = text;
  this.options = options;
  this.answers = answers;
  this.timeout = timeout;
  this.score = 0;

  // Метод вычисления результата
  this.getScore = function (selectedAnswers) {
    // Простая логика: если выбранные ответы совпадают с правильными, начисляем балл
    const correct = this.answers;
    // Сортируем и сравниваем массивы
    if (selectedAnswers.sort().join() === correct.sort().join()) {
      return 1;
    }
    return 0;
  };
  this.renderQuestion = function (questionObj) {
    // Клонируем шаблон из index.html
    const template = document
      .querySelector('.questions__template')
      .content.cloneNode(true);
    template.querySelector('.question__text').textContent = questionObj.text;

    const optionsList = template.querySelector('.question__options');
    // Рендерим варианты ответа
    questionObj.options.forEach((option, idx) => {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const label = document.createElement('label');

      // В зависимости от типа вопроса выбираем radio или checkbox
      input.type = questionObj instanceof radioQuestion ? 'radio' : 'checkbox';
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
    nextButton.addEventListener('click', () => this.handleNext(questionObj));
    FORM_CONTAINER.appendChild(nextButton);
  };

  this.handleNext = function (questionObj) {
    // Получаем выбранные ответы
    const inputs = FORM_CONTAINER.querySelectorAll('input');
    const selectedAnswers = [];
    inputs.forEach((input) => {
      if (input.checked) selectedAnswers.push(input.value);
    });

    // Вычисляем баллы. Метод getScore можно реализовать в вопросах
    questionObj.score = questionObj.getScore(selectedAnswers);

    // Если еще есть вопросы – загружаем следующий, иначе показываем результаты
    this.questionIndex++;
    if (this.questionIndex < this.questionsCount) {
      this.loadQuestion(this.questionIndex);
    } else {
      this.showResult();
    }
  };
}

// Конструктор для радио-вопроса
function radioQuestion(text, options, answers, timeout) {
  // Наследуем свойства от question
  question.call(this, text, options, answers, timeout);
  // Можно добавить специфичную логику для радио-вопроса, если нужно
  this.renderQuestion(questionObj);
}

// Конструктор для чекбокс-вопроса
function checkboxQuestion(text, options, answers, timeout) {
  question.call(this, text, options, answers, timeout);
  this.renderQuestion(questionObj);
}

export { radioQuestion, checkboxQuestion };
