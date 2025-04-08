import { useContext } from 'react';
import { ThemeContext } from '../App';
import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  const theme = useContext(ThemeContext);

  return (
    <button className={'button button_' + theme} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
