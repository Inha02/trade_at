// Detail.tsx
import React from "react";
import { useParams } from "react-router-dom";

type DataType = {
    [key: string]: { rank: string; name: string; description: string }[];
};

// 더미 데이터 예시
const data: DataType = {
    price: [
        { rank: "1", name: "Bitcoin", description: "$40,000" },
        { rank: "2", name: "Ethereum", description: "$2,500" },
        { rank: "3", name: "Cardano", description: "$1.20" },
    ],
    trend: [
        { rank: "1", name: "MA", description: "Moving Average" },
        { rank: "2", name: "EMA", description: "Exponential Moving Average" },
        { rank: "3", name: "SMA", description: "Simple Moving Average" },
        { rank: "4", name: "MACD", description: "Moving Average Convergence Divergence" },
        { rank: "5", name: "Parabolic SAR", description: "Parabolic Stop and Reverse" },
        { rank: "6", name: "Ichimoku Cloud", description: "Ichimoku Kinko Hyo" },
        { rank: "7", name: "ADX", description: "Average Directional Index" },
    ],
    momentum: [
        { rank: "1", name: "RSI", description: "Relative Strength Index" },
        { rank: "2", name: "Stochastic Oscillator", description: "Moderate momentum" },
        { rank: "3", name: "CCI", description: "Commodity Channel Index" },
        { rank: "4", name: "Williams %R", description: "overbought, oversold" },
        { rank: "5", name: "ROC", description: "Rate of Change" },
    ],
    volatility: [
        { rank: "1", name: "Bollinger Bands", description: "High volatility" },
        { rank: "2", name: "Average True Range", description: "Medium volatility" },
        { rank: "3", name: "Keltner Channels", description: "Low volatility" },
    ],
    volume: [
        { rank: "1", name: "Volume", description: "number  of trade" },
        { rank: "2", name: "CMF", description: "Chaikin Money Flow " },
        { rank: "3", name: "A/D", description: "Accumulation/Distribution Line" },
        { rank: "4", name: "Volume Weighted Average Price", description: "Volume Weighted Average Price" },
        { rank: "5", name: "OBV", description: "On-Balance Volume" },
    ],
    market: [
        { rank: "1", name: "Bitcoin", description: "Market Cap: $800B" },
        { rank: "2", name: "Ethereum", description: "Market Cap: $300B" },
        { rank: "3", name: "Cardano", description: "Market Cap: $40B" },
    ],
    additional: [
        { rank: "1", name: "Bitcoin", description: "Extra info..." },
        { rank: "2", name: "Ethereum", description: "Extra info..." },
        { rank: "3", name: "Cardano", description: "Extra info..." },
    ],
};

const Detail: React.FC = () => {
    const { tab, rank } = useParams<{ tab?: string; rank?: string }>();

    // 탭에 따른 데이터 필터링
    const selectedData =
        tab && rank && tab in data
            ? data[tab].find((item) => item.rank === rank)
            : null;

    if (!selectedData) {
        return <p>No data found for Tab: {tab}, Rank: {rank}</p>;
    }

    return (
        <div>
            <h2>Details for Rank {rank} in {tab}</h2>
            <h3>{selectedData.name}</h3>
            <p>{selectedData.description}</p>
        </div>
    );
};

export default Detail;
