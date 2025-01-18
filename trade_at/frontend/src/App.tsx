import React, { useState } from "react";
import StrategyBlockly from "./components/StrategyBlockly";
import ChartView from "./components/ChartView";

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Trade {
  index: number;
  type: "BUY" | "SELL";
  price: number;
  time: number;
}

function App() {
  const [blocklyCode, setBlocklyCode] = useState("");
  const [candles, setCandles] = useState<Candle[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);

  const [symbol, setSymbol] = useState("BTCUSDT");
  const [timeframe, setTimeframe] = useState("1h");

  const handleBacktest = async () => {
    // Parse the code (multiple lines => multiple JSON objects)
    const lines = blocklyCode
      .trim()
      .split("\n")
      .map((str) => str.trim())
      .filter(Boolean);
    const parsedBlocks = lines.map((line) => JSON.parse(line));

    let rsiPeriod = 14;
    let macdFast = 12;
    let macdSlow = 26;
    let macdSignal = 9;

    parsedBlocks.forEach((block: any) => {
      if (block.type === "RSI") {
        rsiPeriod = block.period;
      } else if (block.type === "MACD") {
        macdFast = block.fast;
        macdSlow = block.slow;
        macdSignal = block.signal;
      }
    });

    const strategyConfig = { rsiPeriod, macdFast, macdSlow, macdSignal };

    const response = await fetch("http://localhost:4000/api/backtest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, timeframe, strategyConfig }),
    });

    const data = await response.json();
    setCandles(data.candles || []);
    setTrades(data.trades || []);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "50%" }}>
        <h2>Strategy Editor</h2>
        <StrategyBlockly onCodeChange={setBlocklyCode} />
        <button onClick={handleBacktest}>Run Backtest</button>
      </div>
      <div style={{ width: "50%" }}>
        <h2>Results</h2>
        <ChartView />
      </div>
    </div>
  );
}

export default App;
