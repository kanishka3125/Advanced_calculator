import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, RefreshCw, BarChart3, GraduationCap } from 'lucide-react';
import { CalculatorType, Theme } from '../types';

interface CalculatorTabsProps {
  activeTab: CalculatorType;
  onTabChange: (tab: CalculatorType) => void;
  theme: Theme;
}

const tabs = [
  { id: 'basic' as CalculatorType, label: 'Basic', icon: Calculator },
  { id: 'scientific' as CalculatorType, label: 'Scientific', icon: Calculator },
  { id: 'converter' as CalculatorType, label: 'Converter', icon: RefreshCw },
  { id: 'statistics' as CalculatorType, label: 'Statistics', icon: BarChart3 },
  { id: 'gpa' as CalculatorType, label: 'GPA/CGPA', icon: GraduationCap },
];

const CalculatorTabs: React.FC<CalculatorTabsProps> = ({ activeTab, onTabChange, theme }) => {
  return (
    <motion.div
      className={`flex flex-wrap gap-2 p-4 rounded-2xl ${theme.card} ${theme.shadow} border ${theme.border}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive 
                ? `${theme.buttonOperator} ring-2 ring-offset-2 ring-offset-transparent ring-opacity-50` 
                : `${theme.button} ${theme.buttonHover}`}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconComponent size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default CalculatorTabs;
