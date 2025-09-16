export const calculateStatistics = (numbers: number[]) => {
  if (numbers.length === 0) return null;

  const sorted = [...numbers].sort((a, b) => a - b);
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const mean = sum / numbers.length;

  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  const mode = numbers.reduce((acc: Record<number, number>, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(mode));
  const modeValues = Object.keys(mode).filter(key => mode[Number(key)] === maxCount).map(Number);

  const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
  const standardDeviation = Math.sqrt(variance);

  return {
    count: numbers.length,
    sum,
    mean: Number(mean.toFixed(6)),
    median: Number(median.toFixed(6)),
    mode: modeValues.length === numbers.length ? null : modeValues,
    range: sorted[sorted.length - 1] - sorted[0],
    variance: Number(variance.toFixed(6)),
    standardDeviation: Number(standardDeviation.toFixed(6)),
    min: sorted[0],
    max: sorted[sorted.length - 1],
  };
};
