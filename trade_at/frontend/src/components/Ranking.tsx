import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CoinData {
    rank: number;
    name: string;
    value: string; // This can be price, trend info, etc. depending on the tab
}

const Ranking: React.FC = () => {
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
};

export default Ranking;
