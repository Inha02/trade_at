import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // 상단 메뉴바
import Ranking from "../components/Ranking"; // 랭킹 컴포넌트

const Home: React.FC = () => {
  return (
    <div>
      {/* 상단 메뉴바 */}
      <Navbar />
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Welcome to Crypto Analysis</h1>
        <p>Analyze and monitor your favorite cryptocurrencies.</p>
        {/* Ranking 컴포넌트 포함 */}
        <Ranking />
      </div>
    </div>
  );
};

export default Home;
