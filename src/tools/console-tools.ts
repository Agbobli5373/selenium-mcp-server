import { Tool } from "@modelcontextprotocol/sdk/types.js";

/**
 * Console / browser log reading tools.
 */
export const consoleTools: Tool[] = [
    {
        name: "get_browser_console",
        description: "Retrieve browser console logs. Optionally filter by level or timestamp (ms since epoch).",
        inputSchema: {
            type: "object",
            properties: {
                level: {
                    type: "string",
                    enum: ["ALL", "SEVERE", "WARNING", "INFO", "DEBUG"],
                    description: "Optional log level filter. 'ALL' returns all levels."
                },
                since: {
                    type: "number",
                    description: "Optional timestamp in milliseconds — only return logs newer than this timestamp."
                }
            },
            required: []
        }
    }
];
