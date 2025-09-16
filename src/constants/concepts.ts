import { Calculator, FlaskConical, BarChart3 } from 'lucide-react';

export interface Concept {
  title: string;
  definition: string;
  example?: string;
}

export interface ConceptCategory {
  category: string;
  icon: React.ElementType;
  concepts: Concept[];
}

export const conceptsData: ConceptCategory[] = [
  {
    category: 'Basic Arithmetic',
    icon: Calculator,
    concepts: [
      {
        title: 'Percentage (%)',
        definition: 'Calculates a percentage of a number. It essentially divides the number by 100.',
        example: '50 % = 0.5',
      },
      {
        title: 'Negation (±)',
        definition: 'Switches the sign of a number from positive to negative or vice-versa.',
        example: 'If the display shows 10, pressing ± makes it -10.',
      },
    ],
  },
  {
    category: 'Scientific Functions',
    icon: FlaskConical,
    concepts: [
      {
        title: 'Sine (sin), Cosine (cos), Tangent (tan)',
        definition: 'Trigonometric functions that relate an angle of a right-angled triangle to ratios of two side lengths. The calculation depends on whether the calculator is in Radians (RAD) or Degrees (DEG) mode.',
        example: 'sin(30°) = 0.5',
      },
      {
        title: 'Logarithm (log)',
        definition: 'The base-10 logarithm. It answers the question: "10 to what power gives me this number?"',
        example: 'log(100) = 2, because 10² = 100.',
      },
      {
        title: 'Natural Logarithm (ln)',
        definition: 'The base-e logarithm, where e is Euler\'s number (~2.718). It is used extensively in science and finance for growth/decay calculations.',
        example: 'ln(7.389) ≈ 2, because e² ≈ 7.389.',
      },
      {
        title: 'Square Root (sqrt)',
        definition: 'Finds a number which, when multiplied by itself, gives the original number.',
        example: 'sqrt(16) = 4',
      },
      {
        title: 'Powers (x², x³, x^y)',
        definition: 'Raise a number to a power. x² is squaring, x³ is cubing, and x^y is raising x to the power of y.',
        example: '2^3 = 8',
      },
      {
        title: 'Factorial (!)',
        definition: 'The product of all positive integers up to a given number. It is only defined for non-negative integers.',
        example: '5! = 5 × 4 × 3 × 2 × 1 = 120',
      },
      {
        title: 'Pi (π)',
        definition: 'A constant representing the ratio of a circle\'s circumference to its diameter, approximately 3.14159.',
      },
      {
        title: 'Euler\'s Number (e)',
        definition: 'A mathematical constant that is the base of natural logarithms, approximately 2.71828.',
      },
    ],
  },
  {
    category: 'Statistics Functions',
    icon: BarChart3,
    concepts: [
      {
        title: 'Mean',
        definition: 'The "average" of a set of numbers. It is the sum of all values divided by the count of values.',
      },
      {
        title: 'Median',
        definition: 'The middle value in a sorted list of numbers. It is often a better representation of the "typical" value if there are outliers.',
      },
      {
        title: 'Mode',
        definition: 'The value that appears most frequently in a dataset.',
      },
      {
        title: 'Standard Deviation (Std Dev)',
        definition: 'A measure of how spread out the numbers in a dataset are from the mean. A low value means the data is clustered around the average.',
      },
    ],
  },
];
