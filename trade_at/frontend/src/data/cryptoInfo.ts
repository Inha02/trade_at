import axios from "axios";
import { useEffect, useState } from "react";

/** Basic interface for a candlestick data point */
export interface MarketData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Example intervals: "1m", "3m", "5m", "15m", "30m",
 *                    "1h", "2h", "4h", "6h", "8h", "12h",
 *                    "1d", "3d", "1w", "1M"
 */
type BinanceInterval =
  | "1m"
  | "3m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "2h"
  | "4h"
  | "6h"
  | "8h"
  | "12h"
  | "1d"
  | "3d"
  | "1w"
  | "1M";

interface UseMarketDataReturn {
  data: MarketData[] | null;
  loaded: boolean;
}

/**
 * Hook for fetching and parsing candlestick data from Binance API.
 * @param symbol e.g. "BTCUSDT"
 * @param interval e.g. "1h"
 * @param limit max number of candles to fetch (1-1000)
 * @returns { data, loaded }
 */

export const fetchSymbols = async (): Promise<string[]> => {
  const url = `https://api.binance.com/api/v3/exchangeInfo`;
  const response = await axios.get(url);
  return response.data.symbols
    .filter((symbol: { quoteAsset: string }) => symbol.quoteAsset === "USDT") // USDT 페어만 필터링
    .map((symbol: { symbol: string }) => symbol.symbol);
};

export function CryptoInfo(
  symbol: string = "BTCUSDT",
  interval: BinanceInterval = "1h",
  limit: number = 500
): UseMarketDataReturn {
  const [data, setData] = useState<MarketData[] | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBinanceData() {
      setLoaded(false);
      try {
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const rawData: any[] = await response.json();

        // rawData is an array of arrays, each element is:
        // [Open time, Open, High, Low, Close, Volume, Close time, ...]
        const parsed: MarketData[] = rawData.map((d) => ({
          date: new Date(d[0]), // open time
          open: +d[1],
          high: +d[2],
          low: +d[3],
          close: +d[4],
          volume: +d[5],
        }));

        setData(parsed);
      } catch (err) {
        console.error("Binance fetch error:", err);
      } finally {
        setLoaded(true);
      }
    }

    fetchBinanceData();
  }, [symbol, interval, limit]);

  return { data, loaded };
}
