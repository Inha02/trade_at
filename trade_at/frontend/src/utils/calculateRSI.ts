/**
 * Calculates the Relative Strength Index (RSI) for the given period.
 * @param data - Array of candlestick data with `close` prices.
 * @param period - RSI calculation period (e.g., 14).
 * @returns Array of RSI values aligned with the input data length (padding with `null` for the initial period).
 */
export const calculateRSI = (
  data: { close: number }[],
  period: number
): (number | null)[] => {
  if (!data || data.length < period) {
    return Array(data.length).fill(null); // Return null for all entries if insufficient data
  }

  const rsi: (number | null)[] = Array(period - 1).fill(null); // Fill the initial period with null

  let gains = 0;
  let losses = 0;

  // Initial calculation for the first period
  for (let i = 1; i < period; i++) {
    const change = data[i].close - data[i - 1].close;
    if (change > 0) gains += change;
    else losses -= change;
  }

  gains /= period;
  losses /= period;

  rsi.push(100 - 100 / (1 + gains / (losses || 1)));

  // Calculate RSI for the remaining data
  for (let i = period; i < data.length; i++) {
    const change = data[i].close - data[i - 1].close;
    if (change > 0) {
      gains = (gains * (period - 1) + change) / period;
      losses = (losses * (period - 1)) / period;
    } else {
      gains = (gains * (period - 1)) / period;
      losses = (losses * (period - 1) - change) / period;
    }

    rsi.push(100 - 100 / (1 + gains / (losses || 1)));
  }

  return rsi;
};
