import React, { useEffect, useRef } from "react";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import "blockly/blocks";
import { defineCustomBlocks } from "./customBlocks";
import { defineGenerators } from "./blockGenerators";

interface StrategyBlocklyProps {
  onCodeChange: (code: string) => void; // Callback to send generated code to parent
  onWorkspaceChange?: (workspace: Blockly.WorkspaceSvg | null) => void; // Callback to pass the workspace to the parent
  enableCodeGeneration?: boolean; // Optional flag to enable/disable code generation
}

const StrategyBlockly: React.FC<StrategyBlocklyProps> = ({
  onCodeChange,
  onWorkspaceChange,
  enableCodeGeneration = true, // Default to true
}) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    // Define custom blocks and generators
    defineCustomBlocks();
    defineGenerators();

    // Inject Blockly into the div
    if (blocklyDiv.current) {
      workspaceRef.current = Blockly.inject(blocklyDiv.current, {
        toolbox: generateToolbox(),
      });

      const startingBlock = workspaceRef.current.newBlock("when_clicked");
      startingBlock.initSvg();
      startingBlock.render();
      startingBlock.moveBy(50, 50); // Position the block

      // Pass workspace to parent if onWorkspaceChange is provided

      // Listen for workspace changes
      if (enableCodeGeneration) {
        workspaceRef.current.addChangeListener(() => {
          const code = javascriptGenerator.workspaceToCode(
            workspaceRef.current!
          );
          onCodeChange(code); // Send generated code to parent
          if (onWorkspaceChange) {
            onWorkspaceChange(workspaceRef.current);
          }
        });
      }
    }
    const toolboxElement = document.querySelector(".blocklyToolboxDiv");
    if (toolboxElement) {
      (toolboxElement as HTMLElement).style.backgroundColor = "#191c27"; // 배경색
      (toolboxElement as HTMLElement).style.color = "white"; // 글자색
    }

    return () => {
      // Clean up the Blockly workspace on unmount
      workspaceRef.current?.dispose();
    };
  }, [onCodeChange, onWorkspaceChange, enableCodeGeneration]);

  // Function to dynamically generate the toolbox XML
  const generateToolbox = (): string => {
    return `
      <xml id="toolbox" style="display: none; background-color: #191c27; color: white;">
        <category name="Events">
          <block type="when_clicked"></block>
        </category>
        <category name="Drawing">
          <block type="draw_indicators"></block>
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
    `;
  };

  return <div style={{ height: "585px", width: "100%", }} ref={blocklyDiv} />;
};

export default StrategyBlockly;
