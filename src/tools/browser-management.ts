import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Browser management tools extracted from the original long tools file.
 * This module contains tools that start/stop and control basic navigation.
 */
export const browserManagementTools: Tool[] = [
    {
        name: "start_browser",
        description: "Start a new browser session with specified browser and options",
        inputSchema: {
            type: "object",
            properties: {
                browser: {
                    type: "string",
                    enum: ["chrome", "firefox", "edge", "safari"],
                    description: "Browser to launch",
                    default: "chrome"
                },
                options: {
                    type: "object",
                    properties: {
                        headless: {
                            type: "boolean",
                            description: "Run browser in headless mode",
                            default: false
                        },
                        arguments: {
                            type: "array",
                            items: { type: "string" },
                            description: "Additional browser arguments"
                        },
                        windowSize: {
                            type: "object",
                            properties: {
                                width: { type: "number", description: "Window width" },
                                height: { type: "number", description: "Window height" }
                            },
                            description: "Browser window size"
                        }
                    }
                }
            },
            required: []
        }
    },
    {
        name: "navigate",
        description: "Navigate to a URL for page analysis",
        inputSchema: {
            type: "object",
            properties: {
                url: {
                    type: "string",
                    description: "URL to navigate to for analysis"
                }
            },
            required: ["url"]
        }
    },
    {
        name: "get_current_url",
        description: "Get the current page URL (useful for SPA navigation detection)",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "close_browser",
        description: "Close the current browser session",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "get_title",
        description: "Get the current page title",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "refresh",
        description: "Refresh the current page",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "go_back",
        description: "Navigate back in browser history",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "go_forward",
        description: "Navigate forward in browser history",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    }
];
