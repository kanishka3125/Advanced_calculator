import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { Theme } from '../types';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (themeName: string) => void;
  themes: Record<string, Theme>;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange, themes }) => {
  return (
    <motion.div
      className={`p-4 rounded-2xl ${currentTheme.card} ${currentTheme.shadow} border ${currentTheme.border}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex items-center gap-2 mb-4 ${currentTheme.text}`}>
        <Palette size={20} />
        <h3 className="font-semibold">Themes</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(themes).map(([key, theme]) => (
          <motion.button
            key={key}
            className={`
              p-3 rounded-xl text-sm font-medium transition-all duration-200
              ${currentTheme.name === theme.name 
                ? `${currentTheme.buttonOperator} ring-2 ring-offset-2 ring-offset-transparent ring-opacity-50` 
                : `${currentTheme.button} ${currentTheme.buttonHover}`}
            `}
            onClick={() => onThemeChange(key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ThemeSelector;
