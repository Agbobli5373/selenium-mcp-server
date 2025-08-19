import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Page discovery tools extracted from the original long tools file.
 */
export const pageDiscoveryTools: Tool[] = [
    {
        name: "get_page_source",
        description: "Get the complete HTML source code for AI analysis",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "find_element",
        description: "Find a single element to verify selectors work",
        inputSchema: {
            type: "object",
            properties: {
                by: {
                    type: "string",
                    enum: ["id", "css", "xpath", "name", "tag", "class", "linkText", "partialLinkText"],
                    description: "Locator strategy"
                },
                value: {
                    type: "string",
                    description: "Selector value"
                },
                timeout: {
                    type: "number",
                    description: "Wait timeout in milliseconds",
                    default: 5000
                }
            },
            required: ["by", "value"]
        }
    },
    {
        name: "find_elements",
        description: "Find multiple elements and get count for test validation",
        inputSchema: {
            type: "object",
            properties: {
                by: {
                    type: "string",
                    enum: ["id", "css", "xpath", "name", "tag", "class", "linkText", "partialLinkText"],
                    description: "Locator strategy"
                },
                value: {
                    type: "string",
                    description: "Selector value"
                }
            },
            required: ["by", "value"]
        }
    },
    {
        name: "take_screenshot",
        description: "Capture page screenshot for visual context and documentation",
        inputSchema: {
            type: "object",
            properties: {
                outputPath: {
                    type: "string",
                    description: "Optional path to save screenshot"
                }
            },
            required: []
        }
    },
    {
        name: "execute_script",
        description: "Execute JavaScript for custom page analysis",
        inputSchema: {
            type: "object",
            properties: {
                script: {
                    type: "string",
                    description: "JavaScript code to execute"
                }
            },
            required: ["script"]
        }
    }
];
