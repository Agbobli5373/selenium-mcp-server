import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Accessibility tools (axe-core).
 * Exposes an AI-invokable tool to run axe scans via the Selenium client.
 */
export const accessibilityTools: Tool[] = [
  {
    name: "run_accessibility_scan",
    description: "Run axe-core accessibility scan on the current page. Args: { contextSelector?: string, axeOptions?: object, savePath?: string }",
    inputSchema: {
      type: "object",
      properties: {
        contextSelector: {
          type: "string",
          description: "CSS selector to scope the scan (optional). If omitted, scans the whole document."
        },
        axeOptions: {
          type: "object",
          description: "Options passed to axe.run (optional)"
        },
        savePath: {
          type: "string",
          description: "Filesystem path where JSON results will be written (optional)"
        }
      },
      required: []
    }
  }
];
