import React, { useState, useEffect } from "react";
import { ChartCanvas, Chart } from "react-financial-charts";
import {
  CandlestickSeries,
  XAxis,
  YAxis,
  discontinuousTimeScaleProviderBuilder,
  BarSeries
} from "react-financial-charts";
import { fetchBinanceData, fetchSymbols, KlineData } from "../data/cryptoInfo";

const FinancialChart: React.FC = () => {
  const [data, setData] = useState<KlineData[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string>("BTCUSDT");
  const [selectedInterval, setSelectedInterval] = useState<string>("1h");
  const [loaded, setLoaded] = useState<boolean>(false);

  // 모든 심볼 가져오기
  useEffect(() => {
    const getSymbols = async () => {
      try {
        const symbolList = await fetchSymbols();
        setSymbols(symbolList);
      } catch (error) {
        console.error("Failed to fetch symbols", error);
      }
    };
    getSymbols();
  }, []);

  // 선택한 심볼의 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      setLoaded(false); // 로딩 상태 설정
      try {
        const chartData = await fetchBinanceData(selectedSymbol, "1h");
        setData(chartData);
        setLoaded(true); // 데이터 로딩 완료
      } catch (error) {
        console.error("Failed to fetch chart data", error);
        setLoaded(true); // 실패해도 로딩 완료로 설정
      }
    };

    getData();
  }, [selectedSymbol, selectedInterval]); // 선택된 심볼이 변경될 때마다 데이터 갱신

  if (!loaded) {
    return <div>Loading chart...</div>;
  }

  const xScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
    (d) => d.date
  );

  const { data: chartData, xScale, xAccessor, displayXAccessor } =
    xScaleProvider(data);

  const xExtents = [
    xAccessor(chartData[0]),
    xAccessor(chartData[chartData.length - 1]),
  ];

  return (
    <div>
      <h1>Binance Candlestick Chart</h1>

      {/* 심볼 선택 드롭다운 */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Symbol: </label>
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
      {/* 시간 단위 선택 드롭다운 */}
      <div style={{ marginBottom: "20px" }}>
        <label>Interval: </label>
        <select
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(e.target.value)}
        >
          <option value="5m">5분봉</option>
          <option value="1h">1시간봉</option>
          <option value="1d">일봉</option>
        </select>
      </div>


      {/* 차트 렌더링 */}
      <ChartCanvas
        height={400}
        width={800}
        ratio={1}
        data={chartData}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        seriesName={selectedSymbol}
      >
        <Chart id={1} yExtents={(d: KlineData) => [d.high, d.low]}>
          <XAxis />
          <YAxis />
          <CandlestickSeries />
        </Chart>

        <Chart
          id={2}
          height={150} // 거래량 차트 높이 설정
          yExtents={(d: KlineData) => d.volume}
          origin={(w, h) => [0, h - 150]} // 거래량 차트를 아래에 배치
        >
          <XAxis />
          <YAxis />
          <BarSeries yAccessor={(d: KlineData) => d.volume} />
        </Chart>

      </ChartCanvas>
    </div>
  );
};

export default FinancialChart;
