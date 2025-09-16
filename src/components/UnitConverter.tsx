import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';
import { CONVERSION_RATES } from '../utils/constants';

interface UnitConverterProps {
  theme: Theme;
  onCalculation: (calculation: string, result: string) => void;
}

const UnitConverter: React.FC<UnitConverterProps> = ({ theme, onCalculation }) => {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState('0.001');

  const categories = {
    length: { name: 'Length', units: CONVERSION_RATES.length },
    weight: { name: 'Weight', units: CONVERSION_RATES.weight },
    temperature: { name: 'Temperature', units: { c: 'Celsius', f: 'Fahrenheit', k: 'Kelvin' } },
  };

  const convert = (inputValue: string, from: string, to: string, cat: typeof category) => {
    const num = parseFloat(inputValue) || 0;
    
    if (cat === 'temperature') {
      let celsius: number;
      
      // Convert to Celsius first
      switch (from) {
        case 'f': celsius = (num - 32) * 5 / 9; break;
        case 'k': celsius = num - 273.15; break;
        default: celsius = num;
      }
      
      // Convert from Celsius to target
      let convertedValue: number;
      switch (to) {
        case 'f': convertedValue = (celsius * 9 / 5) + 32; break;
        case 'k': convertedValue = celsius + 273.15; break;
        default: convertedValue = celsius;
      }
      
      return convertedValue.toFixed(6);
    } else {
      const rates = CONVERSION_RATES[cat];
      const baseValue = num / rates[from as keyof typeof rates];
      const convertedValue = baseValue * rates[to as keyof typeof rates];
      return convertedValue.toFixed(6);
    }
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    const converted = convert(newValue, fromUnit, toUnit, category);
    setResult(converted);
    
    const calculation = `${newValue} ${fromUnit} → ${toUnit}`;
    onCalculation(calculation, `${converted} ${toUnit}`);
  };

  const handleCategoryChange = (newCategory: typeof category) => {
    setCategory(newCategory);
    const units = Object.keys(categories[newCategory].units);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
    handleValueChange(value);
  };

  return (
    <motion.div
      className={`p-6 rounded-3xl ${theme.card} ${theme.shadow} border ${theme.border}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Category Selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {Object.entries(categories).map(([key, cat]) => (
          <motion.button
            key={key}
            onClick={() => handleCategoryChange(key as typeof category)}
            className={`
              p-3 rounded-xl text-sm font-medium transition-all duration-200
              ${category === key 
                ? `${theme.buttonOperator} ring-2 ring-offset-2 ring-offset-transparent` 
                : `${theme.button} ${theme.buttonHover}`}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Input */}
      <div className={`p-4 rounded-2xl ${theme.display} border ${theme.border} mb-4`}>
        <input
          type="number"
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          className={`w-full bg-transparent text-2xl ${theme.text} outline-none`}
          placeholder="Enter value"
        />
      </div>

      {/* From Unit */}
      <div className="mb-4">
        <label className={`block text-sm ${theme.textSecondary} mb-2`}>From:</label>
        <select
          value={fromUnit}
          onChange={(e) => {
            setFromUnit(e.target.value);
            handleValueChange(value);
          }}
          className={`w-full p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`}
        >
          {Object.keys(categories[category].units).map((unit) => (
            <option key={unit} value={unit} className={theme.background}>
              {unit.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* To Unit */}
      <div className="mb-4">
        <label className={`block text-sm ${theme.textSecondary} mb-2`}>To:</label>
        <select
          value={toUnit}
          onChange={(e) => {
            setToUnit(e.target.value);
            handleValueChange(value);
          }}
          className={`w-full p-3 rounded-xl ${theme.button} ${theme.text} border ${theme.border} outline-none`}
        >
          {Object.keys(categories[category].units).map((unit) => (
            <option key={unit} value={unit} className={theme.background}>
              {unit.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Result */}
      <div className={`p-4 rounded-2xl ${theme.display} border ${theme.border}`}>
        <div className={`text-2xl font-mono ${theme.text}`}>
          {result} {toUnit.toUpperCase()}
        </div>
      </div>

      <div className={`mt-4 text-xs ${theme.textSecondary} text-center`}>
        Unit Converter • {categories[category].name} • Real-time conversion
      </div>
    </motion.div>
  );
};

export default UnitConverter;
