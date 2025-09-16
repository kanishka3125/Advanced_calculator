export const MATHEMATICAL_CONSTANTS = {
  'π': Math.PI,
  'e': Math.E,
  '√2': Math.SQRT2,
  '√½': Math.SQRT1_2,
  'ln2': Math.LN2,
  'ln10': Math.LN10,
  'log2e': Math.LOG2E,
  'log10e': Math.LOG10E,
};

export const PHYSICAL_CONSTANTS = {
  'c': 299792458, // Speed of light (m/s)
  'g': 9.80665, // Standard gravity (m/s²)
  'h': 6.62607015e-34, // Planck constant (J⋅s)
  'R': 8.314462618, // Gas constant (J/(mol⋅K))
  'NA': 6.02214076e23, // Avogadro constant (mol⁻¹)
  'k': 1.380649e-23, // Boltzmann constant (J/K)
};

export const CONVERSION_RATES = {
  length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    in: 39.3701,
    ft: 3.28084,
    yd: 1.09361,
    mi: 0.000621371,
  },
  weight: {
    kg: 1,
    g: 1000,
    lb: 2.20462,
    oz: 35.274,
    st: 0.157473,
    t: 0.001,
  },
  temperature: {
    c: (val: number) => val,
    f: (val: number) => (val * 9) / 5 + 32,
    k: (val: number) => val + 273.15,
  },
};
