import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Interaction tools (basic & element interactions, keyboard, file upload).
 */
export const interactionTools: Tool[] = [
    // BASIC INTERACTION TESTING
    {
        name: "click_element",
        description: "Test click interaction (for verification only)",
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
                    default: 5000
                }
            },
            required: ["by", "value"]
        }
    },
    {
        name: "send_keys",
        description: "Test text input (for verification only)",
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
                    description: "Text to input"
                },
                timeout: {
                    type: "number",
                    default: 5000
                }
            },
            required: ["by", "value", "text"]
        }
    },
    {
        name: "hover_element",
        description: "Hover over element to reveal hidden content (dropdowns, tooltips, menus)",
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
                    default: 5000
                }
            },
            required: ["by", "value"]
        }
    },

    // ELEMENT INTERACTION
    {
        name: "clear_element",
        description: "Clear the content of an input element",
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
        name: "double_click_element",
        description: "Perform a double click on an element",
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
        name: "right_click_element",
        description: "Perform a right click (context click) on an element",
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
        name: "drag_and_drop",
        description: "Drag an element and drop it onto another element",
        inputSchema: {
            type: "object",
            properties: {
                sourceBy: {
                    type: "string",
                    enum: ["id", "css", "xpath", "name", "tag", "class", "linkText", "partialLinkText"],
                    description: "Locator strategy for source element"
                },
                sourceValue: {
                    type: "string",
                    description: "Selector value for source element"
                },
                targetBy: {
                    type: "string",
                    enum: ["id", "css", "xpath", "name", "tag", "class", "linkText", "partialLinkText"],
                    description: "Locator strategy for target element"
                },
                targetValue: {
                    type: "string",
                    description: "Selector value for target element"
                },
                timeout: {
                    type: "number",
                    default: 10000
                }
            },
            required: ["sourceBy", "sourceValue", "targetBy", "targetValue"]
        }
    },

    // KEYBOARD ACTIONS
    {
        name: "press_key",
        description: "Simulate pressing a keyboard key",
        inputSchema: {
            type: "object",
            properties: {
                key: {
                    type: "string",
                    description: "Key to press (e.g., 'Enter', 'Tab', 'Escape', 'Space', 'F1', etc.)"
                }
            },
            required: ["key"]
        }
    },
    {
        name: "press_key_combo",
        description: "Simulate pressing a combination of keys",
        inputSchema: {
            type: "object",
            properties: {
                keys: {
                    type: "array",
                    items: { type: "string" },
                    description: "Array of keys to press together (e.g., ['ctrl', 'c'] for Ctrl+C)"
                }
            },
            required: ["keys"]
        }
    },

    // FILE OPERATIONS
    {
        name: "upload_file",
        description: "Upload a file using a file input element",
        inputSchema: {
            type: "object",
            properties: {
                by: {
                    type: "string",
                    enum: ["id", "css", "xpath", "name", "tag", "class", "linkText", "partialLinkText"],
                    description: "Locator strategy for file input element"
                },
                value: {
                    type: "string",
                    description: "Selector value for file input element"
                },
                filePath: {
                    type: "string",
                    description: "Absolute or relative path to the file to upload"
                },
                timeout: {
                    type: "number",
                    default: 10000
                }
            },
            required: ["by", "value", "filePath"]
        }
    }
];
