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

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface IndicatorChartProps {
  indicatorsUsed: string[];
  data: { close: number; date: Date }[];
}

const IndicatorChart: React.FC<IndicatorChartProps> = ({
  indicatorsUsed,
  data,
}) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const calculateIndicators = () => {
      if (!data || data.length === 0) {
        setChartData(null);
        return;
      }

      let datasets: any[] = [];

      if (indicatorsUsed.includes("RSI")) {
        const rsiData = calculateRSI(data, 14);
        datasets.push({
          label: "RSI",
          data: rsiData,
          borderColor: "blue",
          fill: false,
        });
      }

      if (indicatorsUsed.includes("MACD")) {
        const macdData = calculateMACD(data, 12, 26, 9);
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
