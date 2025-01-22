// BlockLogics.ts
import * as Blockly from "blockly/core";

export function getIndicatorsUsed(workspace: Blockly.WorkspaceSvg): string[] {
  const detectedIndicators: string[] = [];

  if (workspace) {
    const blocks = workspace.getAllBlocks();

    blocks.forEach((block) => {
      if (block.type === "rsi_block") {
        detectedIndicators.push("RSI");
      } else if (block.type === "macd_block") {
        detectedIndicators.push("MACD");
      }
    });
  }

  return detectedIndicators;
}
