import React, { useState } from "react";
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
import { CryptoInfo } from "../data/CryptoInfo";
import OHLCTooltip from "./OHLCTooltips";

interface Margin {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface FinancialChartProps {
  dateTimeFormat?: string;
  height: number;
  margin: Margin;
  priceDisplayFormat?: (value: number) => string;
  ratio: number;
  width: number;
}

// Some basic style objects
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

const openCloseColor = (d: { close: number; open: number }) =>
  d.close > d.open ? "#26a69a" : "#ef5350";

// A simple yExtents calculator
function yExtentsCalculator(options: {
  plotData: { high: number; low: number }[];
  xDomain: any;
  xAccessor: any;
  displayXAccessor: any;
  fullData: any[];
}): number[] {
  const { plotData } = options; // Now we destructure from the single 'options' parameter
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const { low, high } of plotData) {
    if (low < min) min = low;
    if (high > max) max = high;
  }
  if (min === Number.POSITIVE_INFINITY || max === Number.NEGATIVE_INFINITY) {
    min = 0;
    max = 0;
  }
  const padding = (max - min) * 0.1;
  return [min - padding, max + padding * 2];
}

const FinancialChart: React.FC<FinancialChartProps> = ({
  dateTimeFormat = "%d %b '%y \xa0 %H:%M", // Not used in this snippet, but leftover from d3-time-format
  height,
  margin,
  priceDisplayFormat = (value: number) => {
    // Basic decimal formatting (2 decimals)
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  },
  ratio,
  width,
}) => {
  const { data: initialData, loaded } = CryptoInfo();
  const [resetCount, setResetCount] = useState(0);
  console.log(loaded, height, ratio, width);
  if (!loaded || !height || !ratio || !width) return null;

  // Create scale
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor(
      (d: any) => d.date
    );
  const safeData = initialData ?? [];

  const { data, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(safeData);

  // Show last "width / 5" bars
  const min = xAccessor(data[Math.max(0, data.length - Math.floor(width / 5))]);
  const max = xAccessor(data[data.length - 1]);
  const xExtents = [min, max + 1];

  const gridHeight = height - margin.top - margin.bottom;
  const barChartHeight = gridHeight / 5;
  const barChartOrigin = (_: number, h: number) => [0, h - barChartHeight];

  return (
    <ChartCanvas
      height={height}
      ratio={ratio}
      width={width}
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
      <Chart id={2} yExtentsCalculator={yExtentsCalculator}>
        <XAxis {...axisStyles} showGridLines />
        <MouseCoordinateX
          // Replacing the old 'timeFormat' usage with a simpler numeric or date approach
          displayFormat={(val: number) => {
            // A basic date format:
            return new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }).format(val);
          }}
          {...coordinateStyles}
        />
        <YAxis {...axisStyles} showGridLines />
        <MouseCoordinateY
          rectWidth={margin.right}
          displayFormat={priceDisplayFormat}
          {...coordinateStyles}
        />
        <EdgeIndicator
          itemType="last"
          rectWidth={margin.right}
          fill={openCloseColor}
          lineStroke={openCloseColor}
          displayFormat={priceDisplayFormat}
          yAccessor={(d: any) => d.close}
        />
        <CandlestickSeries />
        <OHLCTooltip
          origin={[8, 16]}
          textFill={openCloseColor}
          className="react-no-select"
        />
        <ZoomButtons
          onReset={() => setResetCount((prev) => prev + 1)}
          {...zoomButtonStyles}
        />
      </Chart>
      <CrossHairCursor {...crossHairStyles} />
    </ChartCanvas>
  );
};

export const ChartView = withSize()(
  withDeviceRatio()(
    FinancialChart as unknown as React.ComponentClass<FinancialChartProps>
  )
);

export default ChartView;
