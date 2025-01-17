import React from "react";

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

interface ChartViewProps {
  candles: Candle[];
  trades: Trade[];
}

const ChartView: React.FC<ChartViewProps> = ({ candles, trades }) => {
  if (!candles || candles.length === 0) {
    return <div>No chart data</div>;
  }

  return (
    <div>
      <h3>Chart</h3>
      <p>Candle count: {candles.length}</p>
      <p>Trades count: {trades.length}</p>
      {/* In a real scenario, integrate a chart library, e.g. react-stockcharts or TradingView */}
    </div>
  );
};

export default ChartView;
