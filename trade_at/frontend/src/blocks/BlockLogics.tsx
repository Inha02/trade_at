import * as Blockly from "blockly/core";

// Function to get indicators used inside the 'draw_indicators' block
export function getIndicatorsUsed(workspace: Blockly.WorkspaceSvg): string[] {
  const detectedIndicators: string[] = [];

  if (workspace) {
    const blocks = workspace.getAllBlocks();

    blocks.forEach((block) => {
      if (block.type === "draw_indicators") {
        // Check the inputs connected to the 'draw_indicators' block
        const indicator1 = block.getInputTargetBlock("INDICATOR_1");
        const indicator2 = block.getInputTargetBlock("INDICATOR_2");

        // Check if the first indicator is of type 'rsi_block' or 'macd_block'
        if (indicator1) {
          if (indicator1.type === "rsi_block") {
            detectedIndicators.push("RSI");
          } else if (indicator1.type === "macd_block") {
            detectedIndicators.push("MACD");
          }
        }

        // Check if the second indicator is of type 'rsi_block' or 'macd_block'
        if (indicator2) {
          if (indicator2.type === "rsi_block") {
            detectedIndicators.push("RSI");
          } else if (indicator2.type === "macd_block") {
            detectedIndicators.push("MACD");
          }
        }
      }
    });
  }

  return detectedIndicators;
}

// Function to get the parameters for the indicators (RSI and MACD)
export function getIndicatorParameters(workspace: Blockly.WorkspaceSvg) {
  let rsiPeriod = 14; // Default RSI period
  let macdFast = 12; // Default MACD fast period
  let macdSlow = 26; // Default MACD slow period
  let macdSignal = 9; // Default MACD signal period

  if (workspace) {
    const blocks = workspace.getAllBlocks();

    blocks.forEach((block) => {
      if (block.type === "draw_indicators") {
        // Check the inputs connected to the 'draw_indicators' block
        const indicator1 = block.getInputTargetBlock("INDICATOR_1");
        const indicator2 = block.getInputTargetBlock("INDICATOR_2");

        // If the first indicator is 'rsi_block', fetch the 'RSI_PERIOD'
        if (indicator1 && indicator1.type === "rsi_block") {
          rsiPeriod = indicator1.getFieldValue("RSI_PERIOD");
        }

        // If the second indicator is 'rsi_block', fetch the 'RSI_PERIOD'
        if (indicator2 && indicator2.type === "rsi_block") {
          rsiPeriod = indicator2.getFieldValue("RSI_PERIOD");
        }

        // If the first indicator is 'macd_block', fetch the 'MACD_FAST', 'MACD_SLOW', and 'MACD_SIGNAL'
        if (indicator1 && indicator1.type === "macd_block") {
          macdFast = indicator1.getFieldValue("MACD_FAST");
          macdSlow = indicator1.getFieldValue("MACD_SLOW");
          macdSignal = indicator1.getFieldValue("MACD_SIGNAL");
        }

        // If the second indicator is 'macd_block', fetch the 'MACD_FAST', 'MACD_SLOW', and 'MACD_SIGNAL'
        if (indicator2 && indicator2.type === "macd_block") {
          macdFast = indicator2.getFieldValue("MACD_FAST");
          macdSlow = indicator2.getFieldValue("MACD_SLOW");
          macdSignal = indicator2.getFieldValue("MACD_SIGNAL");
        }
      }
    });
  }

  return { rsiPeriod, macdFast, macdSlow, macdSignal };
}
