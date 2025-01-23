import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { calculateRSI } from "../utils/calculateRSI";
import { calculateMACD } from "../utils/calculateMACD";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  zoomPlugin
);

interface IndicatorChartProps {
  indicatorsUsed: string[];
  data: { close: number; date: Date }[];
  rsiPeriod: number;
  macdFast: number;
  macdSlow: number;
  macdSignal: number;
}

const IndicatorChart: React.FC<IndicatorChartProps> = ({
  indicatorsUsed,
  data,
  rsiPeriod,
  macdFast,
  macdSlow,
  macdSignal,
}) => {
  const [chartData, setChartData] = useState<any>(null);
  console.log("indicatorsUsed", indicatorsUsed);
  console.log("data", data);

  useEffect(() => {
    const calculateIndicators = () => {
      if (!data || data.length === 0) {
        setChartData(null);
        return;
      }

      let datasets: any[] = [];

      if (indicatorsUsed.includes("RSI")) {
        const rsiData = calculateRSI(data, rsiPeriod);
        datasets.push({
          label: "RSI",
          data: rsiData,
          borderColor: "blue",
          fill: false,
        });
      }

      if (indicatorsUsed.includes("MACD")) {
        const macdData = calculateMACD(data, macdFast, macdSlow, macdSignal);
        datasets.push(
          {
            label: "MACD",
            data: macdData.macdLine,
            borderColor: "green",
            fill: false,
          },
          {
            label: "Signal Line",
            data: macdData.signalLine,
            borderColor: "red",
            fill: false,
          },
          {
            label: "Histogram",
            data: macdData.histogram,
            borderColor: "purple",
            backgroundColor: "rgba(128, 0, 128, 0.2)",
            fill: true,
          }
        );
      }

      setChartData({
        labels: data.map((d) => d.date.toISOString()),
        datasets: datasets,
      });
    };

    calculateIndicators();
  }, [indicatorsUsed, data]);

  if (!chartData) return <div>No data available to plot the chart.</div>;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: { display: true, text: "Date" },
      },
      y: {
        type: "linear",
        title: { display: true, text: "Value" },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default IndicatorChart;