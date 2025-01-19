import React from "react";
import { functor, GenericChartComponent, last } from "@react-financial-charts/core";
import { ToolTipText, ToolTipTSpanLabel } from "@react-financial-charts/tooltip";

// Simple plus sign format
const defaultChangeFormat = (val: number): string => {
  // signDisplay can add + for positive
  return new Intl.NumberFormat("en-US", {
    signDisplay: "always",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

// Simple percent format
const defaultPercentFormat = (val: number): string => {
  // e.g. +2.34%
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "always",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

// Ohlc format
const defaultOhlcFormat = (val: number): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
};

// Volume format
const defaultVolumeFormat = (val: number): string => {
  // e.g. 12.3K
  if (val > 1_000_000) {
    return (val / 1_000_000).toFixed(2) + "M";
  } else if (val > 1000) {
    return (val / 1000).toFixed(2) + "K";
  }
  return val.toFixed(2);
};

interface DisplayTexts {
  o: string;
  h: string;
  l: string;
  c: string;
  na: string;
  v: string;
}

const displayTextsDefault: DisplayTexts = {
  o: "O: ",
  h: " H: ",
  l: " L: ",
  c: " C: ",
  na: " n/a ",
  v: " \xa0 Vol: ",
};

interface OHLCTooltipProps {
  accessor?: (d: any) => any;
  changeFormat?: (val: number) => string;
  className?: string;
  displayTexts?: DisplayTexts;
  displayValuesFor?: (props: OHLCTooltipProps, moreProps: any) => any;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  labelFill?: string;
  labelFontWeight?: number;
  ohlcFormat?: (val: number) => string;
  onClick?: React.MouseEventHandler<SVGGElement>;
  origin?: [number, number];
  percentFormat?: (val: number) => string;
  textFill?: ((d: any) => string) | string | null;
  volumeFormat?: (val: number) => string;
  currentItem?: any;
}

export class OHLCTooltip extends React.Component<OHLCTooltipProps> {
  public static defaultProps = {
    accessor: (d: any) => d,
    changeFormat: defaultChangeFormat,
    className: "react-financial-charts-tooltip-hover",
    displayTexts: displayTextsDefault,
    displayValuesFor: (_: any, props: OHLCTooltipProps) => props.currentItem,
    fontFamily: "-apple-system, system-ui, 'Helvetica Neue', Ubuntu, sans-serif",
    fontSize: "12px",
    fontWeight: 300,
    labelFill: "#9EAAC7",
    labelFontWeight: 300,
    ohlcFormat: defaultOhlcFormat,
    onClick: null,
    origin: [0, 0],
    percentFormat: defaultPercentFormat,
    textFill: null,
    volumeFormat: defaultVolumeFormat,
  };

  constructor(props: OHLCTooltipProps) {
    super(props);
    this.renderSVG = this.renderSVG.bind(this);
  }

  private renderSVG(moreProps: any) {
    const {
      accessor,
      changeFormat,
      className,
      displayTexts,
      displayValuesFor,
      fontFamily,
      fontSize,
      fontWeight,
      labelFill,
      labelFontWeight,
      ohlcFormat,
      onClick,
      origin: originProp,
      percentFormat,
      textFill,
      volumeFormat,
    } = this.props;

    const {
      chartConfig: { width, height },
      fullData,
    } = moreProps;

    const currentItem =
      (displayValuesFor && displayValuesFor(this.props, moreProps)) ?? last(fullData);

    let open = displayTexts?.na ?? "n/a";
    let high = displayTexts?.na ?? "n/a";
    let low = displayTexts?.na ?? "n/a";
    let close = displayTexts?.na ?? "n/a";
    let changeVal = displayTexts?.na ?? "n/a";
    let volume = displayTexts?.na ?? "n/a";

    if (currentItem !== undefined && accessor) {
      const item = accessor(currentItem);
      if (item !== undefined) {
        open = ohlcFormat ? ohlcFormat(item.open) : String(item.open);
        high = ohlcFormat ? ohlcFormat(item.high) : String(item.high);
        low = ohlcFormat ? ohlcFormat(item.low) : String(item.low);
        close = ohlcFormat ? ohlcFormat(item.close) : String(item.close);

        const diff = item.close - item.open;
        if (changeFormat && percentFormat) {
          changeVal = `${changeFormat(diff)} (${percentFormat(diff / item.open)})`;
        }
        volume = volumeFormat ? volumeFormat(item.volume) : String(item.volume);
      }
    }

    // Evaluate origin if it's a function
    const [x, y] = functor(originProp!)(width, height);
    const valFill = typeof textFill === "function" ? textFill(currentItem) : textFill || "#000";

    return (
      <g className={className} transform={`translate(${x}, ${y})`} onClick={onClick || undefined}>
        <ToolTipText
          x={0}
          y={0}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
        >
          {/* O */}
          <ToolTipTSpanLabel fill={labelFill} fontWeight={labelFontWeight}>
            {displayTexts?.o}
          </ToolTipTSpanLabel>
          <tspan fill={valFill}>{open}</tspan>

          {/* H */}
          <ToolTipTSpanLabel fill={labelFill} fontWeight={labelFontWeight}>
            {displayTexts?.h}
          </ToolTipTSpanLabel>
          <tspan fill={valFill}>{high}</tspan>

          {/* L */}
          <ToolTipTSpanLabel fill={labelFill} fontWeight={labelFontWeight}>
            {displayTexts?.l}
          </ToolTipTSpanLabel>
          <tspan fill={valFill}>{low}</tspan>

          {/* C */}
          <ToolTipTSpanLabel fill={labelFill} fontWeight={labelFontWeight}>
            {displayTexts?.c}
          </ToolTipTSpanLabel>
          <tspan fill={valFill}>{close}</tspan>

          {/* change */}
          <tspan fill={valFill}>{` ${changeVal}`}</tspan>

          {/* volume */}
          <ToolTipTSpanLabel fill={labelFill} fontWeight={labelFontWeight}>
            {displayTexts?.v}
          </ToolTipTSpanLabel>
          <tspan fill={valFill}>{volume}</tspan>
        </ToolTipText>
      </g>
    );
  }

  public render() {
    return (
      <GenericChartComponent
        clip={false}
        svgDraw={this.renderSVG}
        drawOn={["mousemove"]}
      />
    );
  }
}

export default OHLCTooltip;
