import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface DisplayProps {
  value: string;
  theme: Theme;
  expression?: string;
}

const Display: React.FC<DisplayProps> = ({ value, theme, expression }) => {
  const formatValue = (val: string): string => {
    if (val.length > 12) {
      try {
        const num = parseFloat(val);
        if (Math.abs(num) > 999999999999 || (Math.abs(num) < 0.0000001 && num !== 0)) {
          return num.toExponential(5);
        }
      } catch (e) {
        // Not a number, return as is
        return val;
      }
    }
    return val;
  };

  return (
    <motion.div
      className={`
        w-full p-4 rounded-2xl ${theme.display} 
        text-right min-h-[110px]
        flex flex-col justify-between border ${theme.border}
      `}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`h-8 text-xl ${theme.textSecondary} opacity-75 truncate`}>
        {expression || ''}
      </div>
      <motion.span
        key={value}
        initial={{ scale: 1.05, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="truncate text-4xl font-light"
      >
        {formatValue(value)}
      </motion.span>
    </motion.div>
  );
};

export default Display;
