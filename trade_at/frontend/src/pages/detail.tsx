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
        { rank: "1", name: "MA", description: "Up 2%" },
        { rank: "2", name: "EMA", description: "Down 1%" },
        { rank: "3", name: "SMA", description: "Up 0.5%" },
        { rank: "4", name: "MACD", description: "Up 2%" },
        { rank: "5", name: "Parabolic SAR", description: "Down 1%" },
        { rank: "6", name: "Ichimoku Cloud", description: "Up 0.5%" },
        { rank: "7", name: "Average Directional Index", description: "Up 2%" },
    ],
    momentum: [
        { rank: "1", name: "Relative Strength Index", description: "High momentum" },
        { rank: "2", name: "Stochastic Oscillator", description: "Moderate momentum" },
        { rank: "3", name: "Commodity Channel Index", description: "Low momentum" },
        { rank: "4", name: "Williams %R", description: "High momentum" },
        { rank: "5", name: "Rate of Change", description: "Moderate momentum" },
    ],
    volatility: [
        { rank: "1", name: "Bollinger Bands", description: "High volatility" },
        { rank: "2", name: "Average True Range", description: "Medium volatility" },
        { rank: "3", name: "Keltner Channels", description: "Low volatility" },
    ],
    volume: [
        { rank: "1", name: "Volume", description: "$20B" },
        { rank: "2", name: "Chaikin Money Flow", description: "$10B" },
        { rank: "3", name: "Accumulation/Distribution Line", description: "$2B" },
        { rank: "4", name: "•	Volume Weighted Average Price", description: "$2B" },
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
