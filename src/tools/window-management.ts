import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Window management tools extracted from the original long tools file.
 */
export const windowManagementTools: Tool[] = [
    {
        name: "maximize_window",
        description: "Maximize the browser window",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "minimize_window",
        description: "Minimize the browser window",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "set_window_size",
        description: "Set the browser window size",
        inputSchema: {
            type: "object",
            properties: {
                width: {
                    type: "number",
                    description: "Window width in pixels"
                },
                height: {
                    type: "number",
                    description: "Window height in pixels"
                }
            },
            required: ["width", "height"]
        }
    },
    {
        name: "get_window_size",
        description: "Get the current browser window size",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "switch_to_window",
        description: "Switch to a specific browser window or tab",
        inputSchema: {
            type: "object",
            properties: {
                windowHandle: {
                    type: "string",
                    description: "Window handle to switch to"
                }
            },
            required: ["windowHandle"]
        }
    },
    {
        name: "get_window_handles",
        description: "Get all available window handles",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    }
];
