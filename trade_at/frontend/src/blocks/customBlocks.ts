import * as Blockly from "blockly/core";

export function defineCustomBlocks() {
  // RSI Block
  Blockly.Blocks["rsi_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("RSI Period")
        .appendField(new Blockly.FieldNumber(14, 1, 100, 1), "RSI_PERIOD");
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("Specify RSI period");
      this.setHelpUrl("");
    },
  };

  // MACD Block
  Blockly.Blocks["macd_block"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("MACD (Fast, Slow, Signal)")
        .appendField(new Blockly.FieldNumber(12, 1, 100, 1), "MACD_FAST")
        .appendField(new Blockly.FieldNumber(26, 1, 100, 1), "MACD_SLOW")
        .appendField(new Blockly.FieldNumber(9, 1, 50, 1), "MACD_SIGNAL");
      this.setOutput(true, "Array");
      this.setColour(210);
      this.setTooltip("Specify MACD parameters");
      this.setHelpUrl("");
    },
  };
}
