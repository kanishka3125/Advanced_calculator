import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface ButtonProps {
  value: string;
  theme: Theme;
  onClick: () => void;
  className?: string;
  isScientific?: boolean;
}

const Button: React.FC<ButtonProps> = ({ value, theme, onClick, className = '', isScientific = false }) => {
  const getButtonStyle = () => {
    if (['C', '±', '%'].includes(value)) {
      return `${theme.buttonSpecial} ${theme.buttonSpecialHover}`;
    } else if (['+', '-', '×', '÷', '=', '^'].includes(value)) {
      return `${theme.buttonOperator} ${theme.buttonOperatorHover}`;
    } else if (isScientific) {
      return `${theme.buttonOperator} ${theme.buttonOperatorHover} opacity-90`;
    } else {
      return `${theme.buttonNumber} ${theme.buttonNumberHover}`;
    }
  };

  const getTextSize = () => {
    if (value.length > 3) return 'text-xs';
    if (value.length > 2) return 'text-sm';
    return 'text-lg';
  };

  return (
    <motion.button
      className={`
        h-16 w-full rounded-2xl font-semibold ${getTextSize()} transition-all duration-200
        ${getButtonStyle()}
        ${theme.buttonActive}
        transform hover:scale-105 active:scale-95
        flex items-center justify-center
        ${className}
      `}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {value}
    </motion.button>
  );
};

export default Button;
