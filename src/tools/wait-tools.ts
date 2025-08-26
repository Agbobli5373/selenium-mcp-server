import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Wait condition tools.
 */
export const waitTools: Tool[] = [
    {
        name: "wait_for_element",
        description: "Wait for an element to be present on the page",
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
                    default: 10000
                }
            },
            required: ["by", "value"]
        }
    },
    {
        name: "wait_for_element_visible",
        description: "Wait for an element to become visible",
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
                    default: 10000
                }
            },
            required: ["by", "value"]
        }
    },
    {
        name: "wait_for_element_clickable",
        description: "Wait for an element to become clickable",
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
                    default: 10000
                }
            },
            required: ["by", "value"]
        }
    },
    {
        name: "wait_for_text_present",
        description: "Wait for specific text to be present in an element",
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
                text: {
                    type: "string",
                    description: "Text to wait for in the element"
                },
                timeout: {
                    type: "number",
                    default: 10000
                }
            },
            required: ["by", "value", "text"]
        }
    }
];
