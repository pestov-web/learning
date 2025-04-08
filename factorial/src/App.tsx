import { createContext, useState } from 'react';
import './App.css';
import FactForm from './components/FactForm';
import Button from './components/Button';
const ThemeContext = createContext('light');
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <FactForm />
        <Button
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        >
          Сменить Бэкгаунд
        </Button>{' '}
      </ThemeContext.Provider>{' '}
    </>
  );
}

export default App;
export { ThemeContext };
