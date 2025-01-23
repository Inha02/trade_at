import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CoinData {
    rank: number;
    name: string;
    value: string; // This can be price, trend info, etc. depending on the tab
}

const Ranking: React.FC = () => {
    // State to manage which tab (category) is active
    const [activeTab, setActiveTab] = useState<string>("price");
    const navigate = useNavigate();

    const handleRowClick = (rank: number) => {
        navigate(`/detail/${activeTab}/${rank}`);
    };

    // Mock data for each category/tab
    const dataByCategory: Record<string, CoinData[]> = {
        price: [
            { rank: 1, name: "Bitcoin", value: "$40,000" },
            { rank: 2, name: "Ethereum", value: "$2,500" },
            { rank: 3, name: "Cardano", value: "$1.20" },
        ],
        trend: [
            { rank: 1, name: "MA", value: "Moving Average" },
            { rank: 2, name: "EMA", value: "Exponential Moving Average" },
            { rank: 3, name: "SMA", value: "Simple Moving Average" },
            { rank: 4, name: "MACD", value: "Moving Average Convergence Divergence" },
            { rank: 5, name: "Parabolic SAR", value: "Parabolic Stop and Reverse" },
            { rank: 6, name: "Ichimoku Cloud", value: "Ichimoku Kinko Hyo" },
            { rank: 7, name: "Average Directional Index", value: "Average Directional Index" },
        ],
        momentum: [
            { rank: 1, name: "Relative Strength Index", value: "Relative Strength Index" },
            { rank: 2, name: "Stochastic Oscillator", value: "Moderate momentum" },
            { rank: 3, name: "Commodity Channel Index", value: "Commodity Channel Index" },
            { rank: 4, name: "Williams %R", value: "overbought, oversold" },
            { rank: 5, name: "Rate of Change", value: "Rate of Change" },
        ],
        volatility: [
            { rank: 1, name: "Bollinger Bands", value: "High volatility" },
            { rank: 2, name: "Average True Range", value: "Medium volatility" },
            { rank: 3, name: "Keltner Channels", value: "Low volatility" },
        ],
        volume: [
            { rank: 1, name: "Volume", value: "number  of trade" },
            { rank: 2, name: "Chaikin Money Flow", value: "Chaikin Money Flow" },
            { rank: 3, name: "Accumulation/Distribution Line", value: "Accumulation/Distribution Line" },
            { rank: 4, name: "Volume Weighted Average Price", value: "Volume Weighted Average Price" },
            { rank: 5, name: "OBV", value: "On-Balance Volume" },
        ],
        market: [
            { rank: 1, name: "Bitcoin", value: "Market Cap: $800B" },
            { rank: 2, name: "Ethereum", value: "Market Cap: $300B" },
            { rank: 3, name: "Cardano", value: "Market Cap: $40B" },
        ],
        additional: [
            { rank: 1, name: "Bitcoin", value: "Extra info..." },
            { rank: 2, name: "Ethereum", value: "Extra info..." },
            { rank: 3, name: "Cardano", value: "Extra info..." },
        ],
    };

    // List of tabs we want to show
    const tabs = [
        "price",
        "trend",
        "momentum",
        "volatility",
        "volume",
        "market",
        "additional",
    ];

    // Renders the appropriate table based on the active tab
    const renderTable = () => {
        const currentData = dataByCategory[activeTab];
        return (
            <table
                style={{ marginTop: "16px", borderCollapse: "collapse", width: "100%" }}
            >
                {/* <thead>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rank</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </th>
                    </tr>
                </thead> */}
                <tbody>
                    {currentData.map((coin) => (
                        <tr
                            key={coin.rank}
                            onClick={() => handleRowClick(coin.rank)}
                            style={{
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#e0e0e0")
                            }
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                        >
                            <td
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    textAlign: "center",
                                    width: "10%",
                                }}
                            >
                                {coin.rank}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    textAlign: "center",
                                    width: "45%",
                                }}
                            >
                                {coin.name}
                            </td>
                            <td
                                style={{
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    textAlign: "center",
                                    width: "45%",
                                }}
                            >
                                {coin.value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            {/* <h2>Top Coins</h2> */}
            <nav style={{ display: "flex", gap: "8px" }}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: activeTab === tab ? "#191c27" : "#f0f0f0",
                            color: activeTab === tab ? "#fff" : "#000",
                            border: "none",
                            padding: "8px 16px",
                            cursor: "pointer",
                            transition: "background-color 0.2s ease, color 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                                activeTab === tab ? "#1e2330" : "#e0e0e0";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                activeTab === tab ? "#191c27" : "#f0f0f0";
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>
            {renderTable()}
        </div>
    );
};

export default Ranking;