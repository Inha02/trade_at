import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CoinData {
    rank: number;
    name: string;
    value: string; // This can be price, trend info, etc. depending on the tab
}

const Ranking: React.FC = () => {
<<<<<<< HEAD
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
            { rank: 1, name: "MA", value: "Up 2%" },
            { rank: 2, name: "EMA", value: "Down 1%" },
            { rank: 3, name: "SMA", value: "Up 0.5%" },
            { rank: 4, name: "MACD", value: "Up 2%" },
            { rank: 5, name: "Parabolic SAR", value: "Down 1%" },
            { rank: 6, name: "Ichimoku Cloud", value: "Up 0.5%" },
            { rank: 7, name: "Average Directional Index", value: "Up 2%" },
        ],
        momentum: [
            { rank: 1, name: "Relative Strength Index", value: "High momentum" },
            { rank: 2, name: "Stochastic Oscillator", value: "Moderate momentum" },
            { rank: 3, name: "Commodity Channel Index", value: "Low momentum" },
            { rank: 4, name: "Williams %R", value: "High momentum" },
            { rank: 5, name: "Rate of Change", value: "Moderate momentum" },
        ],
        volatility: [
            { rank: 1, name: "Bollinger Bands", value: "High volatility" },
            { rank: 2, name: "Average True Range", value: "Medium volatility" },
            { rank: 3, name: "Keltner Channels", value: "Low volatility" },
        ],
        volume: [
            { rank: 1, name: "Volume", value: "$20B" },
            { rank: 2, name: "Chaikin Money Flow", value: "$10B" },
            { rank: 3, name: "Accumulation/Distribution Line", value: "$2B" },
            { rank: 4, name: "Volume Weighted Average Price", value: "$2B" },
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
            <table style={{ marginTop: "16px", borderCollapse: "collapse", width: "100%", }}>
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
                        <tr key={coin.rank}
                            onClick={() => handleRowClick(coin.rank)}
                            style={{
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "#e0e0e0")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "")
                            }>
                            <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center", width: "10%", }}>
                                {coin.rank}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center", width: "45%", }}>
                                {coin.name}
                            </td>
                            <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center", width: "45%", }}>
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
                            e.currentTarget.style.backgroundColor = activeTab === tab ? "#1e2330" : "#e0e0e0";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = activeTab === tab ? "#191c27" : "#f0f0f0";
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>
            {renderTable()}
        </div>
    );
=======
  const coins = [
    { rank: 1, name: "Bitcoin", price: "$40,000" },
    { rank: 2, name: "Ethereum", price: "$2,500" },
    { rank: 3, name: "Cardano", price: "$1.20" },
  ];

  return (
    <div>
      <h2>Top Coins</h2>
      <ul>
        {coins.map((coin) => (
          <li key={coin.rank}>
            {coin.rank}. {coin.name} - {coin.price}
          </li>
        ))}
      </ul>
    </div>
  );
>>>>>>> b8a25f9a6c30c58ec37af2fe4d9e7922964329d2
};

export default Ranking;
