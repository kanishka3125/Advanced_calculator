import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History as HistoryIcon, Trash2, ChevronDown, ChevronUp, Bot } from 'lucide-react';
import { CalculationItem, Theme } from '../types';

interface HistoryProps {
  history: CalculationItem[];
  theme: Theme;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  onClearHistory: () => void;
  onExplain: (itemId: string) => void;
}

const History: React.FC<HistoryProps> = ({ 
  history, 
  theme, 
  showHistory, 
  setShowHistory, 
  onClearHistory,
  onExplain
}) => {
  return (
    <motion.div
      className={`p-4 rounded-2xl ${theme.card} ${theme.shadow} border ${theme.border} w-full max-w-md`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 ${theme.text}`}>
          <HistoryIcon size={20} />
          <h3 className="font-semibold">History</h3>
          <span className={`text-xs ${theme.textSecondary}`}>({history.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <motion.button
              className={`p-2 rounded-lg ${theme.buttonSpecial} ${theme.buttonSpecialHover}`}
              onClick={onClearHistory}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Clear history"
            >
              <Trash2 size={16} />
            </motion.button>
          )}
          
          <motion.button
            className={`p-2 rounded-lg ${theme.button} ${theme.buttonHover}`}
            onClick={() => setShowHistory(!showHistory)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {history.length === 0 ? (
              <div className={`text-center py-8 ${theme.textSecondary}`}>
                <p className="text-sm">No calculations yet</p>
                <p className="text-xs mt-1">Start calculating to see history</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.slice(0, 10).map((item) => (
                  <motion.div
                    key={item.id}
                    className={`p-3 rounded-lg ${theme.button} ${theme.border} border`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className={`text-sm ${theme.textSecondary} mb-1 break-all`}>
                          {item.calculation}
                        </div>
                        <div className={`text-lg font-semibold ${theme.accent} break-all`}>
                          = {item.result}
                        </div>
                      </div>
                      <motion.button
                        onClick={() => onExplain(item.id)}
                        className={`p-2 rounded-lg ${theme.buttonOperator} ${theme.buttonOperatorHover} flex-shrink-0 ml-2`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Explain with CalcBot"
                      >
                        <Bot size={16} />
                      </motion.button>
                    </div>
                    <div className={`text-xs ${theme.textSecondary} mt-1`}>
                      {item.timestamp}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default History;
