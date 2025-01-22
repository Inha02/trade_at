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

// New function to get indicator parameters
export function getIndicatorParameters(workspace: Blockly.WorkspaceSvg) {
  let rsiPeriod = 14; // Default RSI period
  let macdFast = 12; // Default MACD fast period
  let macdSlow = 26; // Default MACD slow period
  let macdSignal = 9; // Default MACD signal period

  if (workspace) {
    const blocks = workspace.getAllBlocks();

    blocks.forEach((block) => {
      if (block.type === "rsi_block") {
        rsiPeriod = block.getFieldValue("RSI_PERIOD");
      } else if (block.type === "macd_block") {
        macdFast = block.getFieldValue("MACD_FAST");
        macdSlow = block.getFieldValue("MACD_SLOW");
        macdSignal = block.getFieldValue("MACD_SIGNAL");
      }
    });
  }

  return { rsiPeriod, macdFast, macdSlow, macdSignal };
}
