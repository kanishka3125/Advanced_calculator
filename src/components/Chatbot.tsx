import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, HelpCircle } from 'lucide-react';
import { Theme, ChatMessage, CalculationItem } from '../types';
import { getChatbotResponse } from '../utils/chatbotEngine';
import TypingIndicator from './TypingIndicator';

interface ChatbotProps {
  theme: Theme;
  history: CalculationItem[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialQuery?: string | null;
}

const Chatbot: React.FC<ChatbotProps> = ({ theme, history, isOpen, onClose, onOpen, initialQuery }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'How do I use the programmer calculator?',
    'Tell me about the different themes.',
    'Explain `10 * (5 + 3)`',
    'What is a factorial?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        text: "Hi! I'm CalcBot, your friendly guide to this calculator suite. Ask me how to use any feature, or for help with a math concept. What's on your mind?",
        sender: 'bot',
      }]);
    }

    if (isOpen && initialQuery) {
      handleQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const handleQuery = (query: string) => {
    if (query.trim() === '') return;
    
    setIsTyping(true);

    // Don't show user message if it's an internal 'explain' command
    if (!query.startsWith('explain:')) {
      const userMessage: ChatMessage = {
        id: (Date.now() - 1).toString(),
        text: query,
        sender: 'user',
      };
      setMessages(prev => [...prev, userMessage]);
    }
    
    setTimeout(() => {
      const botResponseText = getChatbotResponse(query, history);
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: botResponseText,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500); // Simulate thinking
  };

  const handleSend = () => {
    handleQuery(input);
    setInput('');
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={onOpen}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full ${theme.buttonOperator} ${theme.shadow} flex items-center justify-center z-40`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open Chatbot"
      >
        <Bot size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[600px] rounded-2xl ${theme.card} ${theme.shadow} border ${theme.border} flex flex-col z-50`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${theme.border}`}>
              <div className={`flex items-center gap-2 ${theme.text}`}>
                <Bot size={20} />
                <h3 className="font-semibold">CalcBot Assistant</h3>
              </div>
              <motion.button
                onClick={onClose}
                className={`p-1 rounded-full ${theme.button} ${theme.buttonHover}`}
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[80%] p-3 rounded-xl text-sm
                        ${msg.sender === 'user' 
                          ? `${theme.buttonOperator} text-white` 
                          : `${theme.button} ${theme.textSecondary}`}
                      `}
                    >
                      {msg.text.split('\n').map((line, index) => (
                        <p key={index} className={line.trim() === '' ? 'h-4' : ''}>
                          {line.startsWith('`') && line.endsWith('`') 
                            ? <code className={`p-1 rounded ${theme.display}`}>{line.slice(1, -1)}</code> 
                            : line}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
                {isTyping && <TypingIndicator theme={theme} />}
                <div ref={messagesEndRef} />
              </div>
              {messages.length <= 1 && !isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <div className={`flex items-center gap-2 text-sm ${theme.textSecondary} mb-3`}>
                    <HelpCircle size={16} />
                    <span>Some things you can ask:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map(prompt => (
                      <motion.button
                        key={prompt}
                        onClick={() => handleQuery(prompt)}
                        className={`px-3 py-1.5 rounded-lg text-xs ${theme.button} ${theme.buttonHover}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${theme.border} flex items-center gap-2`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className={`flex-1 p-2 rounded-lg ${theme.display} ${theme.text} border ${theme.border} outline-none text-sm`}
              />
              <motion.button
                onClick={handleSend}
                className={`p-2 rounded-lg ${theme.buttonOperator}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
