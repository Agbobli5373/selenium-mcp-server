import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * AI-optimized discovery tools extracted from the original long tools file.
 */
export const aiTools: Tool[] = [
    {
        name: "get_all_links",
        description: "Get all clickable links on the page for navigation test generation",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_all_forms",
        description: "Get all forms and their fields for form test generation",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_all_buttons",
        description: "Get all buttons and interactive elements",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_page_summary",
        description: "Get AI-friendly structured summary of the page",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "validate_selectors",
        description: "Test multiple selectors to find the most reliable ones",
        inputSchema: {
            type: "object",
            properties: {
                selectors: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            by: { type: "string" },
                            value: { type: "string" }
                        }
                    },
                    description: "Array of selectors to validate"
                }
            },
            required: ["selectors"]
        }
    }
];
