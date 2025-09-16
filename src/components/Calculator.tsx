import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { Theme, Settings } from '../types';
import Button from './Button';
import Display from './Display';
import { SoundManager } from '../utils/sounds';

interface CalculatorProps {
  theme: Theme;
  onCalculation: (calculation: string, result: string) => void;
  isScientificMode: boolean;
  settings: Settings;
}

const Calculator: React.FC<CalculatorProps> = ({ 
  theme, 
  onCalculation, 
  isScientificMode, 
  settings
}) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isRadianMode, setIsRadianMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [expression, setExpression] = useState('');

  const soundManager = SoundManager.getInstance();

  const handleNewCalculationStart = () => {
    if (operation === '=') {
        setExpression('');
        setPreviousValue(null);
        setOperation(null);
        return true;
    }
    return false;
  }

  const inputDigit = (digit: string) => {
    if (settings.soundEnabled) soundManager.playClickSound();
    
    if (handleNewCalculationStart()) {
        setDisplay(digit);
        setWaitingForOperand(false);
        return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (settings.soundEnabled) soundManager.playClickSound();

    if (handleNewCalculationStart()) {
        setDisplay('0.');
        setWaitingForOperand(false);
        return;
    }
    
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    if (settings.soundEnabled) soundManager.playClickSound();
    
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setExpression('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(display);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (settings.soundEnabled) {
        soundManager.playSuccessSound();
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const performOperation = (nextOperation: string) => {
    if (settings.soundEnabled) soundManager.playClickSound();
    
    const inputValue = parseFloat(display);

    if (previousValue === null) {
        setPreviousValue(display);
        if (nextOperation !== '=') {
            setExpression(`${display} ${nextOperation}`);
        } else {
            setExpression(`${display} =`);
        }
    } else if (operation) {
        const currentValue = previousValue || '0';
        const result = calculate(parseFloat(currentValue), inputValue, operation);
        const resultStr = String(result);

        const calculationString = `${currentValue} ${operation} ${inputValue}`;
        onCalculation(calculationString, resultStr);

        setDisplay(resultStr);
        setPreviousValue(resultStr);

        if (nextOperation === '=') {
            setExpression(`${calculationString} =`);
        } else {
            setExpression(`${resultStr} ${nextOperation}`);
        }
    } else { // Handle chaining after an '='
        setPreviousValue(display);
        if (nextOperation !== '=') {
            setExpression(`${display} ${nextOperation}`);
        }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performScientificOperation = (func: string) => {
    if (settings.soundEnabled) soundManager.playClickSound();
    
    const inputValue = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(isRadianMode ? inputValue : (inputValue * Math.PI) / 180);
        break;
      case 'cos':
        result = Math.cos(isRadianMode ? inputValue : (inputValue * Math.PI) / 180);
        break;
      case 'tan':
        result = Math.tan(isRadianMode ? inputValue : (inputValue * Math.PI) / 180);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case 'x²':
        result = inputValue * inputValue;
        break;
      case 'x³':
        result = inputValue * inputValue * inputValue;
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'e^x':
        result = Math.exp(inputValue);
        break;
      case '10^x':
        result = Math.pow(10, inputValue);
        break;
      case 'x!':
        result = factorial(inputValue);
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = inputValue;
    }

    const resultStr = String(result);
    const calculationString = `${func}(${inputValue})`;
    onCalculation(calculationString, resultStr);
    setDisplay(resultStr);
    setWaitingForOperand(true);
    
    setExpression(`${calculationString} =`);
    setPreviousValue(resultStr);
    setOperation('=');
  };

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      inputDigit(key);
    } else if (key === '.') {
      inputDecimal();
    } else if (key === '+' || key === '-') {
      performOperation(key);
    } else if (key === '*') {
      performOperation('×');
    } else if (key === '/') {
      event.preventDefault();
      performOperation('÷');
    } else if (key === '^') {
      performOperation('^');
    } else if (key === 'Enter' || key === '=') {
      performOperation('=');
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      if (operation === '=') return;
      if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
    }
  }, [display, previousValue, operation, waitingForOperand]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const basicButtons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const scientificButtons = [
    ['C', '±', '%', '÷', 'sin', 'cos'],
    ['7', '8', '9', '×', 'tan', 'log'],
    ['4', '5', '6', '-', 'ln', 'sqrt'],
    ['1', '2', '3', '+', 'x²', 'x³'],
    ['0', '.', '=', '^', '1/x', 'x!'],
    ['π', 'e', 'e^x', '10^x', isRadianMode ? 'RAD' : 'DEG', '']
  ];

  const buttons = isScientificMode ? scientificButtons : basicButtons;

  return (
    <motion.div
      className={`p-6 rounded-3xl ${theme.card} ${theme.shadow} border ${theme.border}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div className="relative">
        <Display value={display} theme={theme} expression={expression} />
        
        <motion.button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 p-2 rounded-lg ${theme.buttonOperator} ${theme.buttonOperatorHover} opacity-80 hover:opacity-100`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Copy to clipboard"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isScientificMode ? 'scientific' : 'basic'}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`grid ${isScientificMode ? 'grid-cols-6' : 'grid-cols-4'} gap-3 mt-6`}
        >
          {buttons.map((row, rowIndex) => 
            row.map((button, buttonIndex) => {
              if (button === '') return <div key={`${rowIndex}-${buttonIndex}`}></div>;
              
              const isLastRow = rowIndex === buttons.length - 1;
              const isZero = button === '0';
              const isScientificButton = ['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x²', 'x³', '1/x', 'e^x', '10^x', 'x!', 'π', 'e', '^'].includes(button);
              const isRadButton = button === 'RAD' || button === 'DEG';
              
              return (
                <Button
                  key={`${rowIndex}-${buttonIndex}`}
                  value={button}
                  theme={theme}
                  className={`${isZero && isLastRow && !isScientificMode ? 'col-span-2' : ''} ${isScientificButton ? 'text-sm' : ''}`}
                  isScientific={isScientificButton || isRadButton}
                  onClick={() => {
                    if (button === 'C') {
                      clear();
                    } else if (button === '±') {
                      setDisplay(String(parseFloat(display) * -1));
                    } else if (button === '%') {
                      performOperation('=');
                      setDisplay(String(parseFloat(display) / 100));
                      setPreviousValue(null);
                      setOperation(null);
                    } else if (button === 'RAD' || button === 'DEG') {
                      setIsRadianMode(!isRadianMode);
                    } else if (isScientificButton) {
                      performScientificOperation(button);
                    } else if (['+', '-', '×', '÷', '^', '='].includes(button)) {
                      performOperation(button);
                    } else if (button === '.') {
                      inputDecimal();
                    } else {
                      inputDigit(button);
                    }
                  }}
                />
              );
            })
          )}
        </motion.div>
      </AnimatePresence>

      <div className={`mt-4 text-xs ${theme.textSecondary} text-center`}>
        {isScientificMode 
          ? `Scientific Mode • ${isRadianMode ? 'Radians' : 'Degrees'}`
          : 'Basic Mode • Keyboard support enabled'
        }
      </div>
    </motion.div>
  );
};

export default Calculator;
