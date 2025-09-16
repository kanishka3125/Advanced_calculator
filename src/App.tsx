import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calculator from './components/Calculator';
import UnitConverter from './components/UnitConverter';
import StatisticsCalculator from './components/StatisticsCalculator';
import GpaCalculator from './components/GpaCalculator';
import CalculatorTabs from './components/CalculatorTabs';
import ThemeSelector from './components/ThemeSelector';
import History from './components/History';
import SettingsPanel from './components/SettingsPanel';
import Chatbot from './components/Chatbot';
import GuidePanel from './components/GuidePanel';
import ConceptsGuide from './components/ConceptsGuide';
import { CalculationItem, Theme, CalculatorType, Settings } from './types';
import { themes } from './constants/themes';
import { SoundManager } from './utils/sounds';

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.dark);
  const [history, setHistory] = useState<CalculationItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<CalculatorType>('basic');
  const [settings, setSettings] = useState<Settings>({
    soundEnabled: true,
    autoTheme: false,
    showAnimations: true,
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatQuery, setInitialChatQuery] = useState<string | null>(null);

  const soundManager = SoundManager.getInstance();

  useEffect(() => {
    const savedHistory = localStorage.getItem('calculator-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedTheme = localStorage.getItem('calculator-theme');
    if (savedTheme) {
      const theme = themes[savedTheme as keyof typeof themes];
      if (theme) setCurrentTheme(theme);
    }

    const savedTab = localStorage.getItem('calculator-tab');
    if (savedTab) {
      setActiveTab(savedTab as CalculatorType);
    }

    const savedSettings = localStorage.getItem('calculator-settings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      soundManager.setSoundEnabled(parsedSettings.soundEnabled);
    }

    if (settings.autoTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? themes.dark : themes.light);
    }
  }, []);

  const addToHistory = (calculation: string, result: string) => {
    const newItem: CalculationItem = {
      id: Date.now().toString(),
      calculation,
      result,
      timestamp: new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updatedHistory = [newItem, ...history.slice(0, 49)];
    setHistory(updatedHistory);
    localStorage.setItem('calculator-history', JSON.stringify(updatedHistory));
    
    if (settings.soundEnabled) {
      soundManager.playSuccessSound();
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculator-history');
  };

  const changeTheme = (themeName: string) => {
    const theme = themes[themeName as keyof typeof themes];
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('calculator-theme', themeName);
    }
  };

  const changeTab = (tab: CalculatorType) => {
    setActiveTab(tab);
    localStorage.setItem('calculator-tab', tab);
    if (settings.soundEnabled) {
      soundManager.playClickSound();
    }
  };

  const handleSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
    localStorage.setItem('calculator-settings', JSON.stringify(newSettings));
    soundManager.setSoundEnabled(newSettings.soundEnabled);
    
    if (newSettings.autoTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? themes.dark : themes.light);
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `calculator-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    if (settings.soundEnabled) {
      soundManager.playSuccessSound();
    }
  };

  const handleExplainCalculation = (itemId: string) => {
    setInitialChatQuery(`explain:${itemId}`);
    setIsChatOpen(true);
  };

  const renderCalculator = () => {
    switch (activeTab) {
      case 'basic':
      case 'scientific':
        return (
          <Calculator 
            theme={currentTheme} 
            onCalculation={addToHistory}
            isScientificMode={activeTab === 'scientific'}
            settings={settings}
          />
        );
      case 'converter':
        return <UnitConverter theme={currentTheme} onCalculation={addToHistory} />;
      case 'statistics':
        return <StatisticsCalculator theme={currentTheme} onCalculation={addToHistory} />;
      case 'gpa':
        return <GpaCalculator theme={currentTheme} onCalculation={addToHistory} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 ${currentTheme.background}`}
      style={{
        background: currentTheme.gradient,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${currentTheme.text}`}>
            Advanced Calculator Suite
          </h1>
          <p className={`text-lg ${currentTheme.textSecondary}`}>
            Beautiful • Powerful • Feature-Rich • Multi-Mode
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <CalculatorTabs
              activeTab={activeTab}
              onTabChange={changeTab}
              theme={currentTheme}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCalculator()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ThemeSelector
                currentTheme={currentTheme}
                onThemeChange={changeTheme}
                themes={themes}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SettingsPanel
                settings={settings}
                theme={currentTheme}
                onSettingsChange={handleSettingsChange}
                onExportHistory={exportHistory}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <History
                history={history}
                theme={currentTheme}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                onClearHistory={clearHistory}
                onExplain={handleExplainCalculation}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GuidePanel theme={currentTheme} />
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <ConceptsGuide theme={currentTheme} />
            </motion.div>
          </div>
        </div>
      </div>
      
      <Chatbot 
        theme={currentTheme}
        history={history}
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => {
          setIsChatOpen(false);
          setInitialChatQuery(null);
        }}
        initialQuery={initialChatQuery}
      />
    </div>
  );
}

export default App;
