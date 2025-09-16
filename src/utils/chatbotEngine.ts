import { CalculationItem } from '../types';

// --- KNOWLEDGE BASE ---

const concepts: Record<string, { definition: string; keywords: string[] }> = {
  sine: {
    definition: 'The sine (sin) function is a trigonometric function of an angle. In a right-angled triangle, it is the ratio of the length of the side opposite the angle to the length of the hypotenuse.',
    keywords: ['sine', 'sin']
  },
  cosine: {
    definition: 'The cosine (cos) function is a trigonometric function of an angle. In a right-angled triangle, it is the ratio of the length of the adjacent side to the length of the hypotenuse.',
    keywords: ['cosine', 'cos']
  },
  tangent: {
    definition: 'The tangent (tan) function is a trigonometric function. It represents the ratio of the length of the side opposite the angle to the length of the side adjacent to the angle in a right-angled triangle.',
    keywords: ['tangent', 'tan']
  },
  logarithm: {
    definition: 'A logarithm (log) is the exponent to which a base must be raised to produce a given number. For example, the logarithm of 100 to base 10 is 2, because 10² = 100.',
    keywords: ['logarithm', 'log']
  },
  natural_log: {
    definition: 'The natural logarithm (ln) is a logarithm to the base e (Euler\'s number, approx. 2.718). It\'s often used in contexts of growth and time.',
    keywords: ['natural logarithm', 'ln']
  },
  factorial: {
    definition: 'The factorial (!) of a non-negative integer \'n\' is the product of all positive integers up to \'n\'. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.',
    keywords: ['factorial', '!']
  },
  pi: {
    definition: 'Pi (π) is a mathematical constant representing the ratio of a circle\'s circumference to its diameter, approximately equal to 3.14159.',
    keywords: ['pi', 'π']
  },
  e: {
    definition: 'Euler\'s number (e) is a mathematical constant that is the base of the natural logarithm. It is approximately equal to 2.71828.',
    keywords: ['euler\'s number', ' e ']
  },
  mean: {
    definition: 'The mean is the "average" of a set of numbers. It is calculated by adding all the numbers together and dividing by the count of numbers.',
    keywords: ['mean', 'average']
  },
  median: {
    definition: 'The median is the middle value in a sorted list of numbers. If there is an even number of values, the median is the average of the two middle numbers.',
    keywords: ['median']
  },
  mode: {
    definition: 'The mode is the value that appears most frequently in a data set. A set of data may have one mode, more than one mode, or no mode at all.',
    keywords: ['mode']
  },
  std_dev: {
    definition: 'Standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation means values are close to the mean, while a high standard deviation means values are spread out.',
    keywords: ['standard deviation', 'std dev']
  },
  gpa: {
    definition: 'GPA stands for Grade Point Average. It\'s a standard way of measuring academic achievement. Each grade (O, A+, A, etc.) is assigned a point value on a 10-point scale. Your GPA is the average of your grade points, weighted by the number of credits for each course.',
    keywords: ['gpa', 'grade point average']
  },
  cgpa: {
    definition: 'CGPA stands for Cumulative Grade Point Average. It is the average of all your semester GPAs over your entire academic career so far. The CGPA calculator helps you project what your new CGPA will be after the current semester.',
    keywords: ['cgpa', 'cumulative gpa']
  }
};

const websiteFeatures: Record<string, { definition: string; keywords: string[] }> = {
  themes: {
    definition: 'You can change the look and feel of the entire app! Just find the "Themes" panel below the calculator and click on an option like Dark, Light, Neon, or Ocean. The change is instant and everything will update to the new color scheme.',
    keywords: ['theme', 'color', 'look', 'design', 'appearance', 'style']
  },
  history: {
    definition: 'The calculator automatically saves your recent calculations. You can see them in the "History" panel. Click the down arrow to expand it. You can clear your history with the trash can icon, or click the little robot icon next to a calculation to have me explain it!',
    keywords: ['history', 'past calculations', 'log', 'save', 'recent']
  },
  modes: {
    definition: 'This app is a full suite of calculators! You can switch between different modes using the tabs at the top:\n\n- **Basic & Scientific**: For everyday math and complex functions.\n- **Converter**: For converting units.\n- **Statistics**: For analyzing datasets.\n- **GPA/CGPA**: For academic grade calculations.\n\nWhich one would you like to know more about?',
    keywords: ['modes', 'types', 'different calculators', 'switch calculator', 'tabs']
  },
  scientific_mode: {
    definition: 'The Scientific calculator is an extension of the Basic one. It adds advanced mathematical functions like `sin`, `cos`, `tan` for trigonometry, `log` and `ln` for logarithms, and power functions like `x²` and `x^y`. You can also switch between Radians (RAD) and Degrees (DEG) for trig functions.',
    keywords: ['scientific']
  },
  converter_mode: {
    definition: 'The Unit Converter is a handy tool for converting between different units of measurement. You can choose a category like Length, Weight, or Temperature, then select your "from" and "to" units. The conversion happens in real-time as you type!',
    keywords: ['converter', 'units', 'meters to feet', 'kg to lbs', 'celsius to fahrenheit']
  },
  statistics_mode: {
    definition: 'The Statistics calculator helps you analyze a set of numbers. Just type a number into the input field and click the plus button to add it to your dataset. The calculator will instantly show you key stats like the mean (average), median, mode, and standard deviation.',
    keywords: ['statistics', 'stats', 'mean', 'median', 'standard deviation']
  },
  gpa_mode: {
    definition: 'The GPA/CGPA calculator is designed for students. It uses a 10-point grading scale (O, A+, A, etc.). Use the "GPA" mode to calculate your GPA for a single semester. Use the "CGPA" mode to enter your current cumulative GPA and total credits, then add your new courses to see what your new CGPA will be. Just add each course with its credits and final grade!',
    keywords: ['gpa', 'cgpa', 'grade calculator', 'student']
  },
  settings: {
    definition: 'You can customize your experience in the "Settings" panel. Here you can:\n\n- **Toggle Sound Effects**: Turn button clicks on or off.\n- **Toggle Animations**: Enable or disable UI animations.\n- **Enable Auto Theme**: Automatically match your computer\'s dark or light mode.\n- **Export History**: Download your calculation history as a file.',
    keywords: ['settings', 'options', 'sound', 'animation', 'auto theme']
  },
  export: {
    definition: 'Want to save your calculation history? Go to the "Settings" panel and click the "Export History" button. This will download a JSON file of your history to your computer, which you can open with any text editor.',
    keywords: ['export', 'download history', 'save history']
  },
  guide: {
    definition: 'You can find detailed instructions in the "User Guide & FAQ" panel below the main calculator. It covers how to use all the features and provides solutions for common problems. Just click it to expand and see the information!',
    keywords: ['guide', 'help', 'faq', 'instructions', 'documentation', 'problems', 'troubleshooting']
  },
  math_concepts: {
    definition: 'Absolutely! There is a "Math Concepts Explained" section right below the calculator. It contains a searchable guide with definitions and examples for all the mathematical functions used here. You can also just ask me to define a specific term, like "what is a logarithm?".',
    keywords: ['math concepts', 'definitions', 'explain math', 'glossary']
  },
  chatbot: {
    definition: 'That\'s me! I\'m CalcBot, your friendly guide. I can help you understand how the calculator works, explain mathematical concepts, and even break down calculations for you. Just ask me anything!',
    keywords: ['you', 'chatbot', 'assistant', 'help', 'bot']
  }
};


// --- LOGIC ENGINE ---

function explainCalculation(item: CalculationItem): string {
  const { calculation, result } = item;
  
  try {
    const steps: string[] = [];
    let currentCalc = calculation.replace(/×/g, '*').replace(/÷/g, '/');

    // This is a simplified parser for demonstration. A real one would use a proper AST.
    const operations = [
      { regex: /\(([^()]+)\)/, name: 'parentheses' },
      { regex: /(\w+)\(([^()]+)\)/, name: 'function' },
      { regex: /(-?\d+\.?\d*)\s*\^\s*(-?\d+\.?\d*)/, name: 'exponent' },
      { regex: /(-?\d+\.?\d*)\s*([*\/])\s*(-?\d+\.?\d*)/, name: 'multiplication/division' },
      { regex: /(-?\d+\.?\d*)\s*([+\-])\s*(-?\d+\.?\d*)/, name: 'addition/subtraction' },
    ];

    let safety = 0;
    while (isNaN(Number(currentCalc)) && safety < 10) {
      let operationFound = false;
      for (const op of operations) {
        const match = currentCalc.match(op.regex);
        if (match) {
          operationFound = true;
          const subExpression = match[0];
          // Using a safer eval alternative is recommended in production
          const subResult = new Function(`return ${subExpression}`)();
          
          steps.push(`First, following the order of operations, we solve \`${subExpression}\`, which gives us \`${subResult.toFixed(4)}\`.`);
          currentCalc = currentCalc.replace(subExpression, subResult.toString());
          steps.push(`The expression simplifies to \`${currentCalc}\`.`);
          break;
        }
      }
      if (!operationFound) break;
      safety++;
    }

    if (steps.length > 0) {
      steps.push(`This leaves us with the final result: \`${result}\`.`);
      return `Of course! Let's break down the calculation: \`${calculation}\`.\n\n` + steps.join('\n\n');
    }

  } catch (e) {
    // Fallback for complex cases
  }

  // Fallback to simple explanation
  return `I can see the calculation is "${calculation}" which results in ${result}. This one is a bit complex for me to break down step-by-step right now. However, I can explain any of the concepts used if you ask!`;
}

export function getChatbotResponse(query: string, history: CalculationItem[]): string {
  const lowerQuery = ` ${query.toLowerCase().trim().replace(/[?.,!]/g, '')} `;

  // 1. Direct command to explain a history item
  if (query.startsWith('explain:')) {
    const id = query.split(':')[1];
    const item = history.find(h => h.id === id);
    if (item) {
      return explainCalculation(item);
    }
    return "I couldn't find that calculation in your history. Please try another one.";
  }
  
  // 2. Command to explain a calculation string
  const calcMatch = query.match(/explain `(.+)`/i) || query.match(/what is `(.+)`/i) || query.match(/calculate `(.+)`/i);
  if (calcMatch && calcMatch[1]) {
    const calc = calcMatch[1];
    try {
      const sanitizedCalc = calc.replace(/×/g, '*').replace(/÷/g, '/');
      const res = new Function(`return ${sanitizedCalc}`)();
      return explainCalculation({ id: '', calculation: calc, result: res.toString(), timestamp: '' });
    } catch (e) {
      return `I had trouble understanding the calculation "${calc}". Please make sure it's a valid mathematical expression.`;
    }
  }

  // 3. Greetings and basic interaction
  if (lowerQuery.match(/ (hello|hi|hey) /)) {
    return "Hello there! I'm CalcBot. How can I help you today? You can ask me about any feature or math concept.";
  }
  
  if (lowerQuery.match(/ (who are you|what can you do) /)) {
    return "I am CalcBot, your guide to this calculator suite! I can show you how to use features like themes or the different calculator modes. I can also explain calculations from your history or define mathematical terms. What would you like to know?";
  }

  // 4. Check for keywords related to website features
  for (const feature of Object.values(websiteFeatures)) {
    for (const keyword of feature.keywords) {
      if (lowerQuery.includes(` ${keyword} `)) {
        return feature.definition;
      }
    }
  }

  // 5. Check for keywords related to math concepts
  for (const concept of Object.values(concepts)) {
    for (const keyword of concept.keywords) {
      if (lowerQuery.includes(` ${keyword} `)) {
        return concept.definition;
      }
    }
  }

  // 6. Fallback response
  return "I'm not quite sure how to answer that. I'm best at explaining how to use this calculator app and defining math terms. Try asking something like:\n\n- 'How does the statistics calculator work?'\n- 'Tell me about the themes.'\n- 'Explain what 'standard deviation' is.'\n- 'Explain `5 * (10 / 2)`'";
}
