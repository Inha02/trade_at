import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import { defineCustomBlocks } from "../blocks/customBlocks";
import { defineGenerators } from "../blocks/blockGenerators";

interface StrategyBlocklyProps {
  onCodeChange: (code: string) => void;
}

const StrategyBlockly: React.FC<StrategyBlocklyProps> = ({ onCodeChange }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    // Define custom blocks and generators
    defineCustomBlocks();
    defineGenerators();

    // Inject Blockly into the div
    if (blocklyDiv.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: `
          <xml id="toolbox" style="display: none">
            <category name="Events">
              <block type="when_clicked"></block>
            </category>
            <category name="Momentum">
              <block type="rsi_block"></block>
              <block type="macd_block"></block>
            </category>
            <category name="Divergence">
              <block type="divergence_rsi_block"></block>
              <block type="divergence_macd_block"></block>
            </category>
            <category name="Logic">
              <block type="controls_if"></block>
              <block type="logic_compare"></block>
              <block type="logic_operation"></block>
              <block type="logic_boolean"></block>
            </category>
            <category name="Math">
              <block type="math_arithmetic"></block>
              <block type="math_number"></block>
            </category>
          </xml>
        `,
      });

      // Listen for workspace changes and generate JavaScript code
      workspaceRef.current.addChangeListener(() => {
        const code = javascriptGenerator.workspaceToCode(workspaceRef.current!);
        onCodeChange(code);
      });
    }

    return () => {
      // Clean up the Blockly workspace on unmount
      workspaceRef.current?.dispose();
    };
  }, [onCodeChange]);

  return <div style={{ height: "600px", width: "100%" }} ref={blocklyDiv} />;
};

export default StrategyBlockly;
