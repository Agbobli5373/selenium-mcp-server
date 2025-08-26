import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Frame management tools.
 */
export const frameTools: Tool[] = [
    {
        name: "switch_to_frame",
        description: "Switch to a specific frame or iframe",
        inputSchema: {
            type: "object",
            properties: {
                frameReference: {
                    type: "string",
                    description: "Frame reference (index, name, or id). Numbers should be passed as strings."
                }
            },
            required: ["frameReference"]
        }
    },
    {
        name: "switch_to_default_content",
        description: "Switch back to the main document from a frame",
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    }
];
