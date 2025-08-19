 // Main client
 export { SeleniumClient } from './selenium-client.js';

 // Individual managers for advanced usage
 export { BrowserManager } from './browser-manager.js';
 export { NavigationManager } from './navigation-manager.js';
 export { ElementLocator } from './element-locator.js';
 export { ElementInteractor } from './element-interactor.js';
 export { ElementInspector } from './element-inspector.js';
 export { ActionManager } from './action-manager.js';
 export { WindowManager } from './window-manager.js';
 export { PageAnalyzer } from './page-analyzer.js';

 // Types and interfaces
 export type {
     BrowserOptions,
     LocatorStrategy,
     SeleniumResponse,
     ElementInfo,
     PageSummary,
     LinkInfo,
     FormField,
     FormInfo,
     ButtonInfo,
     SelectorValidationResult,
     BaseManager
 } from './types';

//  // Legacy export for backward compatibility
//  export { SeleniumClient as SeleniumClientLegacy } from './selenium-client';
