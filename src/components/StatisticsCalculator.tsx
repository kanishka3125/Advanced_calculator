import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Theme } from '../types';
import { calculateStatistics } from '../utils/statistics';

interface StatisticsCalculatorProps {
  theme: Theme;
  onCalculation: (calculation: string, result: string) => void;
}

const StatisticsCalculator: React.FC<StatisticsCalculatorProps> = ({ theme, onCalculation }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addNumber = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      const newNumbers = [...numbers, num];
      setNumbers(newNumbers);
      setInputValue('');
      
      const stats = calculateStatistics(newNumbers);
      if (stats) {
        onCalculation(
          `Added ${num} to dataset (${newNumbers.length} values)`,
          `Mean: ${stats.mean}`
        );
      }
    }
  };

  const removeNumber = (index: number) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
  };

  const clearAll = () => {
    setNumbers([]);
    setInputValue('');
  };

  const stats = calculateStatistics(numbers);

  return (
    <motion.div
      className={`p-6 rounded-3xl ${theme.card} ${theme.shadow} border ${theme.border}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addNumber()}
          placeholder="Enter a number"
          className={`flex-1 p-3 rounded-xl ${theme.display} ${theme.text} border ${theme.border} outline-none`}
        />
        <motion.button
          onClick={addNumber}
          disabled={!inputValue}
          className={`p-3 rounded-xl ${theme.buttonOperator} ${theme.buttonOperatorHover} disabled:opacity-50`}
          whileHover={{ scale: inputValue ? 1.05 : 1 }}
          whileTap={{ scale: inputValue ? 0.95 : 1 }}
        >
          <Plus size={20} />
        </motion.button>
        <motion.button
          onClick={clearAll}
          disabled={numbers.length === 0}
          className={`p-3 rounded-xl ${theme.buttonSpecial} ${theme.buttonSpecialHover} disabled:opacity-50`}
          whileHover={{ scale: numbers.length > 0 ? 1.05 : 1 }}
          whileTap={{ scale: numbers.length > 0 ? 0.95 : 1 }}
        >
          <Trash2 size={20} />
        </motion.button>
      </div>

      {/* Numbers List */}
      {numbers.length > 0 && (
        <div className={`max-h-32 overflow-y-auto mb-4 p-3 rounded-xl ${theme.display} border ${theme.border}`}>
          <div className="flex flex-wrap gap-2">
            {numbers.map((num, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme.button} text-sm`}
              >
                <span>{num}</span>
                <button
                  onClick={() => removeNumber(index)}
                  className={`text-red-400 hover:text-red-300`}
                >
                  <Minus size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {stats ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Count</div>
              <div className={`text-lg font-semibold ${theme.text}`}>{stats.count}</div>
            </div>
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Sum</div>
              <div className={`text-lg font-semibold ${theme.text}`}>{stats.sum}</div>
            </div>
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Mean</div>
              <div className={`text-lg font-semibold ${theme.accent}`}>{stats.mean}</div>
            </div>
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Median</div>
              <div className={`text-lg font-semibold ${theme.accent}`}>{stats.median}</div>
            </div>
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Std Dev</div>
              <div className={`text-lg font-semibold ${theme.text}`}>{stats.standardDeviation}</div>
            </div>
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Range</div>
              <div className={`text-lg font-semibold ${theme.text}`}>{stats.range}</div>
            </div>
          </div>
          
          {stats.mode && (
            <div className={`p-3 rounded-xl ${theme.display} border ${theme.border}`}>
              <div className={`text-xs ${theme.textSecondary} mb-1`}>Mode</div>
              <div className={`text-lg font-semibold ${theme.accent}`}>
                {stats.mode.join(', ')}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <div className={`text-center py-8 ${theme.textSecondary}`}>
          <p className="text-sm">Add numbers to see statistics</p>
          <p className="text-xs mt-1">Mean, median, standard deviation & more</p>
        </div>
      )}

      <div className={`mt-4 text-xs ${theme.textSecondary} text-center`}>
        Statistics Calculator • Real-time analysis • {numbers.length} values
      </div>
    </motion.div>
  );
};

export default StatisticsCalculator;
