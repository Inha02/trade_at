import * as Blockly from "blockly/core";
import "blockly/blocks";
import "blockly/msg/en";

Blockly.Msg["CONTROLS_IF_MSG_IF"] = "만약";
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = "그러면";
Blockly.Msg["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] = "그게 아니고";
Blockly.Msg["CONTROLS_IF_ELSE_TITLE_ELSE"] = "아니라면";
Blockly.Msg["CONTROLS_IF_IF_TITLE_IF"] = "만약";
Blockly.Msg["LOGIC_OPERATION_AND"] = "이고";
Blockly.Msg["LOGIC_OPERATION_OR"] = "이거나";
Blockly.Msg["LOGIC_BOOLEAN_TRUE"] = "참";
Blockly.Msg["LOGIC_BOOLEAN_FALSE"] = "거짓";
Blockly.Msg["MATH_ADDITION_SYMBOL"] = "+";
Blockly.Msg["MATH_SUBTRACTION_SYMBOL"] = "-";
Blockly.Msg["MATH_MULTIPLICATION_SYMBOL"] = "x";
Blockly.Msg["MATH_DIVISION_SYMBOL"] = "/";
Blockly.Msg["MATH_POWER_SYMBOL"] = "^";

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

  Blockly.Blocks["when_clicked"] = {
    init: function () {
      this.jsonInit({
        type: "when_clicked",
        message0: "When flag clicked",
        nextStatement: null,
        colour: 65, // choose a distinct color
        tooltip:
          "Runs the blocks inside when the flag is clicked (start of strategy).",
        helpUrl: "",
        // Mark it as a "hat block" so it can’t be placed under anything else
        hat: "cap",
      });
    },
  };
}
