/**
 * Calculates the Exponential Moving Average (EMA) for a given period.
 * @param data Array of closing prices.
 * @param period The period for the EMA.
 * @returns Array of EMA values.
 */
function calculateEMA(data: number[], period: number): number[] {
  const multiplier = 2 / (period + 1);
  const ema: number[] = [];

  // Calculate the first EMA value as a simple moving average (SMA)
  const initialSMA =
    data.slice(0, period).reduce((acc, val) => acc + val, 0) / period;
  ema.push(initialSMA);

  // Calculate EMA for the rest of the data
  for (let i = period; i < data.length; i++) {
    const prevEMA = ema[ema.length - 1];
    const currentEMA = (data[i] - prevEMA) * multiplier + prevEMA;
    ema.push(currentEMA);
  }

  // Fill with null for the periods where EMA cannot be calculated
  return Array(period - 1)
    .fill(null)
    .concat(ema);
}

/**
 * Calculates the MACD (Moving Average Convergence Divergence) indicator.
 * @param data Array of candlestick data with `close` prices.
 * @param fastPeriod The period for the fast EMA.
 * @param slowPeriod The period for the slow EMA.
 * @param signalPeriod The period for the signal line EMA.
 * @returns An object containing the MACD line, Signal line, and Histogram.
 */
export function calculateMACD(
  data: { close: number }[],
  fastPeriod: number,
  slowPeriod: number,
  signalPeriod: number
): {
  macdLine: (number | null)[];
  signalLine: (number | null)[];
  histogram: (number | null)[];
} {
  const closingPrices = data.map((d) => d.close);

  // Calculate Fast EMA and Slow EMA
  const fastEMA = calculateEMA(closingPrices, fastPeriod);
  const slowEMA = calculateEMA(closingPrices, slowPeriod);

  // Calculate MACD Line
  const macdLine = slowEMA.map((slow, idx) =>
    slow === null || fastEMA[idx] === null ? null : fastEMA[idx]! - slow
  );

  // Calculate Signal Line
  const signalLine = calculateEMA(
    macdLine.filter((val) => val !== null) as number[],
    signalPeriod
  );

  // Calculate Histogram
  const histogram = macdLine.map((macd, idx) =>
    macd === null || signalLine[idx] === null ? null : macd - signalLine[idx]!
  );

  return {
    macdLine,
    signalLine: Array(slowPeriod + signalPeriod - 2)
      .fill(null)
      .concat(signalLine), // Adjust for signal period offset
    histogram,
  };
}

export default calculateMACD;
