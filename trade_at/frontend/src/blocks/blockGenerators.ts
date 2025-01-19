import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import 'blockly/blocks';

export function defineGenerators() {
  // Define the RSI Block Generator
  javascriptGenerator.forBlock["rsi_block"] = (block) => {
    const period = block.getFieldValue("RSI_PERIOD");
    const code = `{"type":"RSI","period":${period}}`;
    return [code, javascriptGenerator.ORDER_ATOMIC];
  };

  // Define the MACD Block Generator
  javascriptGenerator.forBlock["macd_block"] = (block) => {
    const fast = block.getFieldValue("MACD_FAST");
    const slow = block.getFieldValue("MACD_SLOW");
    const signal = block.getFieldValue("MACD_SIGNAL");
    const code = `{"type":"MACD","fast":${fast},"slow":${slow},"signal":${signal}}`;
    return [code, javascriptGenerator.ORDER_ATOMIC];
  };

  javascriptGenerator.forBlock["when_clicked"] = function (block) {
    // Generate code for any statements attached beneath “When clicked”
    const statements = javascriptGenerator.statementToCode(block, "NEXT");

    // We might wrap these statements in a function or simply inline them.
    // Here, we’ll just inline them:
    const code = `
    // ========== WHEN FLAG CLICKED ==========
    (function() {
      ${statements}
    })();
    `;
    return code;
  };
}
