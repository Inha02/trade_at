import React, { useEffect, useState } from "react";
import StrategyBlockly from "../blocks/StrategyBlockly";
import ChartView from "../components/ChartView";
import Navbar from "../components/Navbar";
import { getIndicatorsUsed } from "../blocks/BlockLogics"; // To handle the block logic
import IndicatorChart from "../components/IndicatorChart";

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
    const [indicatorsUsed, setIndicatorsUsed] = useState<string[]>([]);

    // Detect indicators whenever the workspace changes
    useEffect(() => {
        if (!workspace) return;

        const onWorkspaceChange = () => {
            const detectedIndicators = getIndicatorsUsed(workspace);
            setIndicatorsUsed(detectedIndicators);
        };


        // Attach listener to workspace
        workspace.addChangeListener(onWorkspaceChange);

        // Cleanup listener on unmount
        return () => {
            workspace.removeChangeListener(onWorkspaceChange);
        };
    }, [workspace]);

    return (
        <div style={{ height: "100vh" }}>
            <Navbar />
            <div style={{ display: "flex", flexDirection: "row", gap: "0px" }}>
                <div style={{ width: "50%", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2>Results</h2>
                    <div style={{ backgroundColor: "#191c27", width: "100%", height: "65vh" }}>
                        <ChartView
                            onDataChange={setChartData} // Capture chart data
                            margin={{ left: 0, right: 100, top: 10, bottom: 100 }}
                            indicatorsUsed={indicatorsUsed} // Pass indicators to ChartView
                        />
                    </div>
                    <IndicatorChart indicatorsUsed={indicatorsUsed} data={chartData} />

                </div>
                <div style={{ width: "50%", padding: "16px" }}>
                    <h2>Strategy Editor</h2>
                    <StrategyBlockly
                        onCodeChange={setBlocklyCode}
                        onWorkspaceChange={setWorkspace} // Capture workspace
                    />
                    <button style={{ marginTop: "16px" }}>Run Backtest</button>
                </div>
            </div>
        </div>
    );
};

export default ChartPage;
