import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { browserManagementTools } from "./browser-management.js";
import { pageDiscoveryTools } from "./page-discovery.js";
import { elementAnalysisTools } from "./element-analysis.js";
import { interactionTools } from "./interaction-tools.js";
import { windowManagementTools } from "./window-management.js";
import { frameTools } from "./frame-tools.js";
import { waitTools } from "./wait-tools.js";
import { aiTools } from "./ai-tools.js";
import { consoleTools } from "./console-tools.js";
import { accessibilityTools } from "./accessibility-tools.js";

/**
 * Composed tools array — split into smaller modules for readability.
 */
export const tools: Tool[] = [
    ...browserManagementTools,
    ...pageDiscoveryTools,
    ...elementAnalysisTools,
    ...interactionTools,
    ...windowManagementTools,
    ...frameTools,
    ...waitTools,
    ...consoleTools,
    ...aiTools,
    ...accessibilityTools
];
