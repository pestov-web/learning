import '../styles/index.css';
import TestController from './testController';
import { API_URL, START_BUTTON } from './utils/constants';

START_BUTTON.addEventListener('click', () => {
  const controller = new TestController(API_URL);
  controller.init();
  START_BUTTON.textContent = 'Перезапустить';
});
