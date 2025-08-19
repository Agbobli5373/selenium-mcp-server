import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Element analysis tools extracted from the original long tools file.
 */
export const elementAnalysisTools: Tool[] = [
    {
        name: "get_element_text",
        description: "Get element text content for labels, buttons, and validation",
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
        name: "get_element_attribute",
        description: "Get element attributes (id, class, type, name, placeholder, etc.)",
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
                attribute: {
                    type: "string",
                    description: "Attribute name to get"
                },
                timeout: {
                    type: "number",
                    default: 5000
                }
            },
            required: ["by", "value", "attribute"]
        }
    },
    {
        name: "get_element_property",
        description: "Get element properties (value, checked, selected, etc.)",
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
                property: {
                    type: "string",
                    description: "Property name to get"
                },
                timeout: {
                    type: "number",
                    default: 5000
                }
            },
            required: ["by", "value", "property"]
        }
    },
    {
        name: "is_element_displayed",
        description: "Check if element is visible on the page",
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
        name: "is_element_enabled",
        description: "Check if element is enabled and interactive",
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
        name: "is_element_selected",
        description: "Check if element is selected (checkboxes, radio buttons)",
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
        name: "get_element_css_value",
        description: "Get element CSS properties for styling analysis",
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
                cssProperty: {
                    type: "string",
                    description: "CSS property name"
                },
                timeout: {
                    type: "number",
                    default: 5000
                }
            },
            required: ["by", "value", "cssProperty"]
        }
    },
    {
        name: "scroll_to_element",
        description: "Scroll element into view for analysis",
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
    }
];
