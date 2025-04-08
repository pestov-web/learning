import { useRef, useCallback, useState, useContext } from 'react';
import getFact from '../utils/getFact';
import FactResult from './FactResult';
import { ThemeContext } from '../App';

function FactForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [factResult, setFactResult] = useState<number | string | null>(null);
  const theme = useContext(ThemeContext);

  const handleSubmit = useCallback((element: React.FormEvent) => {
    element.preventDefault();
    if (inputRef.current?.value) {
      const value = Number(inputRef.current.value);
      // тут можно поменять валидацию на yup, регулярку итд
      if (Number.isInteger(value) && value >= 0 && value <= 5000) {
        const num: number = value;
        const result: number = getFact(num);
        setFactResult(result);
        inputRef.current.value = '';
      } else {
        setFactResult('Введите целое число от 0 до 5000');
      }
    }
  }, []);

  return (
    <div className={'form-container form-container_' + theme}>
      <form className="form">
        <label htmlFor="number" className="form__label">
          Факториал
        </label>
        <input ref={inputRef} className={'input input_' + theme} />
        <input
          type="submit"
          value="Вычислить"
          className={'button button_' + theme}
          onClick={handleSubmit}
        />
      </form>
      <FactResult factResult={factResult} />
    </div>
  );
}

export default FactForm;
