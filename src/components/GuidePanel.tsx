import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp, Wrench } from 'lucide-react';
import { Theme } from '../types';

interface GuidePanelProps {
  theme: Theme;
}

const guideSections = [
  {
    title: 'Getting Started with Calculator Modes',
    icon: BookOpen,
    content: [
      {
        q: 'How do I switch between calculators?',
        a: 'Use the tabs at the top (Basic, Scientific, Programmer, etc.) to instantly switch between different calculator modes. Your last selected mode is saved for your next visit.',
      },
      {
        q: 'What can the Scientific calculator do?',
        a: 'It includes advanced functions like trigonometry (sin, cos, tan), logarithms (log, ln), powers (x², x^y), square roots, and factorials (!). You can also toggle between Radians (RAD) and Degrees (DEG).',
      },
      {
        q: 'What is the Programmer calculator for?',
        a: 'This mode is for developers. It allows you to perform calculations in different number bases (Decimal, Hexadecimal, Binary, Octal) and use bitwise operations (AND, OR, NOT, XOR).',
      },
      {
        q: 'How does the GPA/CGPA calculator work?',
        a: 'Select the GPA/CGPA tab. Use "GPA" mode for a single semester. Use "CGPA" mode to project your new cumulative GPA by first entering your current CGPA and total credits. Then, add each course with its credits and grade to see the result instantly.',
      },
    ],
  },
  {
    title: 'Common Problems & Troubleshooting',
    icon: Wrench,
    content: [
      {
        q: 'Why does the display show "NaN" or "Infinity"?',
        a: '"NaN" (Not a Number) appears if a calculation is mathematically undefined, like `0 / 0` or `sqrt(-1)`. "Infinity" appears when a number is too large or you divide by zero (e.g., `1 / 0`). Press "C" to clear.',
      },
      {
        q: 'My calculation result seems wrong.',
        a: 'Double-check the order of operations (PEMDAS/BODMAS). The calculator follows this standard rule. For complex calculations, use parentheses `()` to group operations correctly. You can ask CalcBot to explain a calculation from your history.',
      },
      {
        q: 'The calculator is not responding.',
        a: 'Try clearing the state by pressing the "C" button. If that doesn\'t work, a simple page refresh (F5 or Cmd+R) usually solves most temporary issues.',
      },
       {
        q: 'How do I use the keyboard?',
        a: 'You can use your keyboard for most basic and scientific operations. Use number keys for digits, `+`, `-`, `*`, `/` for operators, `Enter` for equals, and `Escape` to clear.',
      },
    ],
  },
];

const GuidePanel: React.FC<GuidePanelProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`p-4 rounded-2xl ${theme.card} ${theme.shadow} border ${theme.border} w-full`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className={`flex items-center gap-2 ${theme.text}`}>
          <BookOpen size={20} />
          <h3 className="font-semibold">User Guide & FAQ</h3>
        </div>
        <motion.button
          className={`p-2 rounded-lg ${theme.button} ${theme.buttonHover}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {guideSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h4 className={`flex items-center gap-2 font-semibold ${theme.textSecondary} mb-2`}>
                    <section.icon size={16} />
                    {section.title}
                  </h4>
                  <div className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className={`p-3 rounded-lg ${theme.button}`}>
                        <p className={`font-semibold text-sm ${theme.accent}`}>{item.q}</p>
                        <p className={`text-xs mt-1 ${theme.textSecondary}`}>{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GuidePanel;
