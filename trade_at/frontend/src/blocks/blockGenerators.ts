import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";

export function defineGenerators() {
  // Define the RSI Block Generator
  javascriptGenerator.forBlock["rsi_block"] = (block) => {
    const period = block.getFieldValue("RSI_PERIOD");
    return [`calculateRSI(data, ${period})`, javascriptGenerator.ORDER_NONE];
  };

  // Define the MACD Block Generator
  javascriptGenerator.forBlock["macd_block"] = (block) => {
    const fast = block.getFieldValue("MACD_FAST");
    const slow = block.getFieldValue("MACD_SLOW");
    const signal = block.getFieldValue("MACD_SIGNAL");
    const code = `{"type":"MACD","fast":${fast},"slow":${slow},"signal":${signal}}`;
    return [code, javascriptGenerator.ORDER_ATOMIC];
  };

  javascriptGenerator.forBlock["draw_indicators"] = function (block) {
    const indicator1 =
      javascriptGenerator.valueToCode(
        block,
        "INDICATOR_1",
        javascriptGenerator.ORDER_NONE
      ) || "null";
    const indicator2 =
      javascriptGenerator.valueToCode(
        block,
        "INDICATOR_2",
        javascriptGenerator.ORDER_NONE
      ) || "null";
    const code = `
    // Draw Indicators
    drawIndicators([
      ${indicator1},
      ${indicator2}
    ]);
    `;
    return code;
  };

  javascriptGenerator.forBlock["when_clicked"] = function (block) {
    // Generate code for any blocks connected below
    const statements = javascriptGenerator.statementToCode(block, ""); // Empty string for nextStatement

    // Handle the case where no statements are attached
    const bodyCode = statements
      ? `
        ${statements}
      `
      : `
        console.log("No actions defined under the 'When clicked' block.");
      `;

    // Generate the structured code
    const code = `
      // ========== WHEN FLAG CLICKED ==========
      (function executeWhenClicked() {
        console.log("Executing 'When clicked' block...");
        ${bodyCode}
      })();
    `;

    return code;
  };
}
