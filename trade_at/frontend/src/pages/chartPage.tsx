import React, { useEffect, useState } from "react";
import StrategyBlockly from "../blocks/StrategyBlockly";
import ChartView from "../components/ChartView";
import Navbar from "../components/Navbar";
import {
    getIndicatorsUsed,
    getIndicatorParameters,
} from "../blocks/BlockLogics"; // Import updated logic
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
    const [rsiPeriod, setRsiPeriod] = useState<number>(14);
    const [macdFast, setMacdFast] = useState<number>(12);
    const [macdSlow, setMacdSlow] = useState<number>(26);
    const [macdSignal, setMacdSignal] = useState<number>(9);
    const barChartOrigin = (_: number, h: number) => [0, h - 100];

    // Detect indicators and their parameters whenever the workspace changes
    useEffect(() => {
        if (!workspace) return;

        const onWorkspaceChange = () => {
            const detectedIndicators = getIndicatorsUsed(workspace);
            setIndicatorsUsed(detectedIndicators);

            // Get the parameters for RSI and MACD
            const { rsiPeriod, macdFast, macdSlow, macdSignal } =
                getIndicatorParameters(workspace);
            setRsiPeriod(rsiPeriod);
            setMacdFast(macdFast);
            setMacdSlow(macdSlow);
            setMacdSignal(macdSignal);
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

                    <IndicatorChart
                        indicatorsUsed={indicatorsUsed}
                        data={chartData}
                        rsiPeriod={rsiPeriod}
                        macdFast={macdFast}
                        macdSlow={macdSlow}
                        macdSignal={macdSignal}
                    />

                </div>
                <div style={{ width: "50%", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2>Strategy Editor</h2>
                    <div style={{ width: "100%", height: "65vh" }}>
                        <StrategyBlockly
                            onCodeChange={setBlocklyCode}
                            onWorkspaceChange={setWorkspace} // Capture workspace
                        />
                    </div>
                    <button
                        style={{
                            marginTop: "0",
                            width: "110px", // 버튼 길이 설정
                            alignSelf: "flex-end",
                        }}
                    >
                        Run Backtest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChartPage;
