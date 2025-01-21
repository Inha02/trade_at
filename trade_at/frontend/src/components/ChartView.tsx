import React, { useEffect, useState, useMemo } from "react";
import {
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  BarSeries,
  CandlestickSeries,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withSize,
  withDeviceRatio,
} from "react-financial-charts";
import { Line } from "react-chartjs-2";
import { CryptoInfo, fetchSymbols } from "../data/CryptoInfo";
import OHLCTooltip from "./OHLCTooltips";
import IndicatorChart from "./IndicatorChart";

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

// Define styles for axes, coordinates, etc.
const axisStyles = {
  strokeStyle: "#383E55",
  strokeWidth: 2,
  tickLabelFill: "#9EAAC7",
  tickStrokeStyle: "#383E55",
  gridLinesStrokeStyle: "rgba(56, 62, 85, 0.5)",
};

const coordinateStyles = {
  fill: "#383E55",
  textFill: "#FFFFFF",
};

const zoomButtonStyles = {
  fill: "#383E55",
  fillOpacity: 0.75,
  strokeWidth: 0,
  textFill: "#9EAAC7",
};

const crossHairStyles = {
  strokeStyle: "#9EAAC7",
};

const quickTimeframes = ["1m", "5m", "15m", "1h", "4h", "1d", "1w"];
const allTimeframes = [
  "1m",
  "5m",
  "15m",
  "1h",
  "2h",
  "4h",
  "1d",
  "3d",
  "1w",
  "1M",
];

// A simple yExtents calculator
function yExtentsCalculator({
  plotData,
}: {
  plotData: { high: number; low: number }[];
}): number[] {
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  plotData.forEach(({ low, high }) => {
    if (low < min) min = low;
    if (high > max) max = high;
  });

  if (min === Number.POSITIVE_INFINITY || max === Number.NEGATIVE_INFINITY) {
    min = 0;
    max = 0;
  }

  const padding = (max - min) * 0.1;
  return [min - padding, max + padding * 2];
}

interface FinancialChartProps {
  height: number;
  width: number;
  ratio: number;
  margin: { left: number; right: number; top: number; bottom: number };
}

interface ChartViewProps {
  onDataChange: (data: any[]) => void; // Callback to send data to parent
}

type CombinedProps = FinancialChartProps & ChartViewProps;

const FinancialChart: React.FC<CombinedProps> = ({
  height,
  width,
  ratio,
  margin,
  onDataChange,
}) => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");
  const [selectedInterval, setSelectedInterval] =
    useState<BinanceInterval>("1h");
  const { data: initialData, loaded } = CryptoInfo(
    selectedSymbol,
    selectedInterval
  );
  const [resetCount, setResetCount] = useState(0);

  useEffect(() => {
    async function loadSymbols() {
      const fetchedSymbols = await fetchSymbols();
      setSymbols(fetchedSymbols);
    }
    loadSymbols();
  }, []);

  const safeData = initialData ?? [];
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: any) => d.date
    );

  const { data, xScale, xAccessor, displayXAccessor } = useMemo(
    () => xScaleProvider(safeData),
    [safeData]
  );

  useEffect(() => {
    // Pass the data to the parent whenever it changes
    if (loaded) {
      onDataChange(data);
    }
  }, [data, loaded, onDataChange]);

  const xExtents = useMemo(() => {
    if (data.length === 0) return [0, 1];
    const min = xAccessor(
      data[Math.max(0, data.length - Math.floor(width / 5))]
    );
    const max = xAccessor(data[data.length - 1]);
    return [min, max + 1];
  }, [data, xAccessor, width]);

  const gridHeight = height - margin.top - margin.bottom;
  const barChartHeight = gridHeight / 5;
  const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight];

  if (!loaded) return <div>Loading chart data...</div>;

  return (
    <div style={{ padding: "16px" }}>
      {/* Symbol Selector */}
      <div style={{ marginBottom: "10px" }}>
        <label>Symbol: </label>
        <select
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      {/* Time Period Selection */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        {/* Quick-Access Timeframes */}
        {quickTimeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedInterval(tf as BinanceInterval)}
            style={{
              padding: "8px 16px",
              backgroundColor: tf === selectedInterval ? "#26a69a" : "#f0f0f0",
              color: tf === selectedInterval ? "#ffffff" : "#000000",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: tf === selectedInterval ? "bold" : "normal",
            }}
          >
            {tf}
          </button>
        ))}

        {/* Dropdown for Additional Timeframes */}
        <select
          value={selectedInterval}
          onChange={(e) =>
            setSelectedInterval(e.target.value as BinanceInterval)
          }
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {allTimeframes.map((tf) => (
            <option key={tf} value={tf}>
              {tf}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Canvas */}
      <ChartCanvas
        height={height}
        width={width}
        ratio={ratio}
        margin={margin}
        seriesName={`Chart ${resetCount}`}
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        {/* Volume Chart */}
        <Chart
          id={1}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={(d: any) => d.volume}
        >
          <BarSeries
            fillStyle={(d: any) =>
              d.close > d.open
                ? "rgba(38, 166, 154, 0.3)"
                : "rgba(239, 83, 80, 0.3)"
            }
            yAccessor={(d: any) => d.volume}
          />
        </Chart>

        {/* Main Price Chart */}
        <Chart
          id={2}
          yExtentsCalculator={(options: any) => yExtentsCalculator(options)}
        >
          <XAxis {...axisStyles} showGridLines />
          <MouseCoordinateX
            displayFormat={(val: number) =>
              new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }).format(val)
            }
            {...coordinateStyles}
          />
          <YAxis {...axisStyles} showGridLines />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={(value: number) =>
              new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(value)
            }
            {...coordinateStyles}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={(d: any) => (d.close > d.open ? "#26a69a" : "#ef5350")}
            yAccessor={(d: any) => d.close}
          />
          <CandlestickSeries />
          <OHLCTooltip
            origin={[8, 16]}
            textFill={(d: any) => (d.close > d.open ? "#26a69a" : "#ef5350")}
          />
          <ZoomButtons onReset={() => setResetCount((prev) => prev + 1)} />
        </Chart>
        <CrossHairCursor {...crossHairStyles} />
      </ChartCanvas>
    </div>
  );
};

export const ChartView = withSize()(
  withDeviceRatio()(
    FinancialChart as unknown as React.ComponentClass<CombinedProps>
  )
);

export default ChartView;
