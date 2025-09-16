import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Theme } from '../types';
import { conceptsData } from '../constants/concepts';

interface ConceptsGuideProps {
  theme: Theme;
}

const ConceptsGuide: React.FC<ConceptsGuideProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const filteredData = conceptsData.map(category => ({
    ...category,
    concepts: category.concepts.filter(concept =>
      concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.concepts.length > 0);

  return (
    <motion.div
      className={`p-4 rounded-2xl ${theme.card} ${theme.shadow} border ${theme.border} w-full`}
    >
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className={`flex items-center gap-2 ${theme.text}`}>
          <BrainCircuit size={20} />
          <h3 className="font-semibold">Math Concepts Explained</h3>
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
            <div className={`relative mb-4`}>
              <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme.textSecondary}`} />
              <input
                type="text"
                placeholder="Search concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-2 pl-10 rounded-lg ${theme.display} ${theme.text} border ${theme.border} outline-none text-sm`}
              />
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {filteredData.length > 0 ? filteredData.map((categoryData) => {
                const isCategoryOpen = openCategory === categoryData.category;
                const Icon = categoryData.icon;
                return (
                  <div key={categoryData.category} className={`rounded-lg ${theme.button} border ${theme.border}`}>
                    <button
                      onClick={() => setOpenCategory(isCategoryOpen ? null : categoryData.category)}
                      className="w-full flex justify-between items-center p-3 text-left"
                    >
                      <div className={`flex items-center gap-2 font-semibold ${theme.text}`}>
                        <Icon size={16} />
                        <span>{categoryData.category}</span>
                      </div>
                      <motion.div animate={{ rotate: isCategoryOpen ? 180 : 0 }}>
                        <ChevronDown size={16} className={`${theme.textSecondary}`} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isCategoryOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 border-t border-gray-700/50 space-y-3">
                            {categoryData.concepts.map((concept) => (
                              <div key={concept.title}>
                                <p className={`font-semibold text-sm ${theme.accent}`}>{concept.title}</p>
                                <p className={`text-xs mt-1 ${theme.textSecondary}`}>{concept.definition}</p>
                                {concept.example && (
                                  <p className={`text-xs mt-1 italic ${theme.textSecondary}`}>
                                    Example: <code className={`p-1 rounded ${theme.display}`}>{concept.example}</code>
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }) : (
                <div className={`text-center py-8 ${theme.textSecondary}`}>
                  <p className="text-sm">No concepts found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ConceptsGuide;
