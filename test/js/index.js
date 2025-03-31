import '../styles/index.css';
import testController from './testController';
import { API_URL, START_BUTTON } from './utils/constants';

START_BUTTON.addEventListener('click', () => {
  const controller = new testController(API_URL);
  controller.init();
  START_BUTTON.textContent = 'Перезапустить';
});
