// blockly-augmentation.d.ts
import { JavascriptGenerator } from "blockly/javascript";

declare module "blockly/javascript" {
  interface JavascriptGenerator {
    ORDER_ATOMIC: number; // Add ORDER_ATOMIC to the type definition
  }
}
