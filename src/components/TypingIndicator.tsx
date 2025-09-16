import React from 'react';
import { motion } from 'framer-motion';
import { Theme } from '../types';

interface TypingIndicatorProps {
  theme: Theme;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ theme }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [0, -4, 0] },
  };

  const dotTransition = (delay: number) => ({
    duration: 0.8,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div
        className={`max-w-[80%] p-3 rounded-xl flex items-center gap-1.5 ${theme.button} ${theme.textSecondary}`}
      >
        <motion.span
          className={`w-2 h-2 rounded-full ${theme.background}`}
          variants={dotVariants}
          animate="animate"
          transition={dotTransition(0)}
        />
        <motion.span
          className={`w-2 h-2 rounded-full ${theme.background}`}
          variants={dotVariants}
          animate="animate"
          transition={dotTransition(0.2)}
        />
        <motion.span
          className={`w-2 h-2 rounded-full ${theme.background}`}
          variants={dotVariants}
          animate="animate"
          transition={dotTransition(0.4)}
        />
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
