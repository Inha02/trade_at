import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";

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
}
