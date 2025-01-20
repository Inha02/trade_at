import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ChartPage from "./pages/chartPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home 컴포넌트를 기본 경로에 연결 */}
        <Route path="/" element={<Home />} />
        {/* Chart 페이지 */}
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;