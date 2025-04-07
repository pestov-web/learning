import { sum } from './calc.js';

const printMessage = (msg: string): void => console.log(`Message: ${msg}`);

const message = 'Hello, TypeScript';

printMessage(message);

const total = sum(100, 200, 300);

console.log(`Total: ${total}`);
