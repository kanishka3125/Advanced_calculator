import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Volume2, VolumeX, Eye, EyeOff, Download, Sun, Moon } from 'lucide-react';
import { Settings, Theme } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  theme: Theme;
  onSettingsChange: (settings: Settings) => void;
  onExportHistory: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  theme,
  onSettingsChange,
  onExportHistory,
}) => {
  return (
    <motion.div
      className={`p-4 rounded-2xl ${theme.card} ${theme.shadow} border ${theme.border}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`flex items-center gap-2 mb-4 ${theme.text}`}>
        <SettingsIcon size={20} />
        <h3 className="font-semibold">Settings</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
            {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="text-sm">Sound Effects</span>
          </div>
          <motion.button
            onClick={() => onSettingsChange({ ...settings, soundEnabled: !settings.soundEnabled })}
            className={`
              relative w-12 h-6 rounded-full transition-all duration-300
              ${settings.soundEnabled ? theme.buttonOperator : theme.button}
            `}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-lg absolute top-0.5"
              animate={{
                x: settings.soundEnabled ? 24 : 2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.button>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
            {settings.showAnimations ? <Eye size={16} /> : <EyeOff size={16} />}
            <span className="text-sm">Animations</span>
          </div>
          <motion.button
            onClick={() => onSettingsChange({ ...settings, showAnimations: !settings.showAnimations })}
            className={`
              relative w-12 h-6 rounded-full transition-all duration-300
              ${settings.showAnimations ? theme.buttonOperator : theme.button}
            `}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-lg absolute top-0.5"
              animate={{
                x: settings.showAnimations ? 24 : 2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.button>
        </div>

        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
            {settings.autoTheme ? <Sun size={16} /> : <Moon size={16} />}
            <span className="text-sm">Auto Theme</span>
          </div>
          <motion.button
            onClick={() => onSettingsChange({ ...settings, autoTheme: !settings.autoTheme })}
            className={`
              relative w-12 h-6 rounded-full transition-all duration-300
              ${settings.autoTheme ? theme.buttonOperator : theme.button}
            `}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-5 h-5 bg-white rounded-full shadow-lg absolute top-0.5"
              animate={{
                x: settings.autoTheme ? 24 : 2,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          </motion.button>
        </div>

        <motion.button
          onClick={onExportHistory}
          className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg ${theme.buttonOperator} ${theme.buttonOperatorHover} text-sm font-medium`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={16} />
          Export History
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
