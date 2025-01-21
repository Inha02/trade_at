import React, { useEffect, useState } from "react";
import * as Blockly from "blockly/core";
import IndicatorChart from "../components/IndicatorChart";

interface BlockLogicsProps {
  workspace: Blockly.WorkspaceSvg; // Workspace passed from StrategyBlockly
  data: any[];
}

const BlockLogics: React.FC<BlockLogicsProps> = ({ workspace, data }) => {
  const [indicatorsUsed, setIndicatorsUsed] = useState<string[]>([]);

  useEffect(() => {
    if (!workspace) return;

    const onWorkspaceChange = () => {
      const blocks = workspace.getAllBlocks();
      console.log("blocks", blocks);
      const detectedIndicators: string[] = [];

      blocks.forEach((block) => {
        if (block.type === "rsi_block") {
          detectedIndicators.push("RSI");
        } else if (block.type === "macd_block") {
          detectedIndicators.push("MACD");
        }
      });

      setIndicatorsUsed(detectedIndicators);
    };

    // Attach listener
    workspace.addChangeListener(onWorkspaceChange);

    // Initial run to populate indicators
    onWorkspaceChange();

    // Cleanup listener on unmount
    return () => {
      workspace.removeChangeListener(onWorkspaceChange);
    };
  }, [workspace]);

  console.log("indicatorUsed", indicatorsUsed);

  return <IndicatorChart indicatorsUsed={indicatorsUsed} data={data} />;
};

export default BlockLogics;
