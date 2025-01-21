import React, { useState } from "react";
import StrategyBlockly from "../blocks/StrategyBlockly";
import ChartView from "../components/ChartView";
import Navbar from "../components/Navbar";
import BlockLogics from "../blocks/BlockLogics"; // To handle the block logic

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Trade {
  index: number;
  type: "BUY" | "SELL";
  price: number;
  time: number;
}

const ChartPage: React.FC = () => {
  const [blocklyCode, setBlocklyCode] = useState("");
  const [workspace, setWorkspace] = useState<any>(null); // Blockly workspace
  const [chartData, setChartData] = useState<any[]>([]); // ChartView data
  console.log("Workspace", workspace);

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
        {/* Strategy Editor */}
        <div style={{ width: "50%", padding: "16px" }}>
          <h2>Strategy Editor</h2>
          <StrategyBlockly
            onCodeChange={setBlocklyCode}
            onWorkspaceChange={setWorkspace} // Capture workspace
          />
          <button style={{ marginTop: "16px" }}>Run Backtest</button>
        </div>

        {/* Results Section */}
        <div style={{ width: "50%", padding: "16px" }}>
          <h2>Results</h2>
          <div style={{ backgroundColor: "#191c27", minHeight: "80vh" }}>
            <ChartView
              onDataChange={setChartData} // Capture chart data
              margin={{ left: 50, right: 50, top: 20, bottom: 30 }}
            />
          </div>

          {/* Block Logic Rendering */}
          {workspace && chartData && (
            <BlockLogics workspace={workspace} data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
