export interface CalculationItem {
  id: string;
  calculation: string;
  result: string;
  timestamp: string;
}

export interface Theme {
  name: string;
  background: string;
  gradient: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  button: string;
  buttonHover: string;
  buttonActive: string;
  buttonNumber: string;
  buttonNumberHover: string;
  buttonOperator: string;
  buttonOperatorHover: string;
  buttonSpecial: string;
  buttonSpecialHover: string;
  display: string;
  shadow: string;
  accent: string;
}

export type CalculatorType = 'basic' | 'scientific' | 'converter' | 'statistics' | 'gpa';

export interface Settings {
  soundEnabled: boolean;
  autoTheme: boolean;
  showAnimations: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}
