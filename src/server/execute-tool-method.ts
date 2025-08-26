import { SeleniumClient } from "../selenium-client/index.js";

/**
 * Delegate execution of a tool to the provided SeleniumClient instance.
 */
export async function executeToolMethod(client: SeleniumClient, toolName: string, args: any): Promise<any> {
    switch (toolName) {
        // BROWSER MANAGEMENT (8 tools)
        case "start_browser":
            return client.startBrowser(args.browser, args.options);
        case "navigate":
            return client.navigate(args.url);
        case "get_current_url":
            return client.getCurrentUrl();
        case "close_browser":
            return client.closeBrowser();
        case "get_title":
            return client.getTitle();
        case "refresh":
            return client.refresh();
        case "go_back":
            return client.goBack();
        case "go_forward":
            return client.goForward();

        // PAGE DISCOVERY (6 tools)
        case "get_page_source":
            return client.getPageSource();
        case "find_element":
            return client.findElement(args.by, args.value, args.timeout);
        case "find_elements":
            return client.findElements(args.by, args.value, args.timeout);
        case "take_screenshot":
            return client.takeScreenshot(args.outputPath);
        case "execute_script":
            return client.executeScript(args.script, args.args);

        // ELEMENT ANALYSIS (8 tools)
        case "get_element_text":
            return client.getElementText(args.by, args.value, args.timeout);
        case "get_element_attribute":
            return client.getElementAttribute(args.by, args.value, args.attribute, args.timeout);
        case "get_element_property":
            return client.getElementProperty(args.by, args.value, args.property, args.timeout);
        case "is_element_displayed":
            return client.isElementDisplayed(args.by, args.value, args.timeout);
        case "is_element_enabled":
            return client.isElementEnabled(args.by, args.value, args.timeout);
        case "is_element_selected":
            return client.isElementSelected(args.by, args.value, args.timeout);
        case "get_element_css_value":
            return client.getElementCssValue(args.by, args.value, args.cssProperty, args.timeout);
        case "scroll_to_element":
            return client.scrollToElement(args.by, args.value, args.timeout);

        // ELEMENT INTERACTION (7 tools)
        case "click_element":
            return client.clickElement(args.by, args.value, args.timeout);
        case "send_keys":
            return client.sendKeys(args.by, args.value, args.text, args.timeout);
        case "hover_element":
            return client.hoverElement(args.by, args.value, args.timeout);
        case "clear_element":
            return client.clearElement(args.by, args.value, args.timeout);
        case "double_click_element":
            return client.doubleClickElement(args.by, args.value, args.timeout);
        case "right_click_element":
            return client.rightClickElement(args.by, args.value, args.timeout);
        case "drag_and_drop":
            return client.dragAndDrop(args.sourceBy, args.sourceValue, args.targetBy, args.targetValue, args.timeout);

        // KEYBOARD ACTIONS (2 tools)
        case "press_key":
            return client.pressKey(args.key);
        case "press_key_combo":
            return client.pressKeyCombo(args.keys);

        // FILE OPERATIONS (1 tool)
        case "upload_file":
            return client.uploadFile(args.by, args.value, args.filePath, args.timeout);

        // WINDOW MANAGEMENT (6 tools)
        case "maximize_window":
            return client.maximizeWindow();
        case "minimize_window":
            return client.minimizeWindow();
        case "set_window_size":
            return client.setWindowSize(args.width, args.height);
        case "get_window_size":
            return client.getWindowSize();
        case "switch_to_window":
            return client.switchToWindow(args.windowHandle);
        case "get_window_handles":
            return client.getWindowHandles();

        // FRAME MANAGEMENT (2 tools)
        case "switch_to_frame":
            return client.switchToFrame(args.frameReference);
        case "switch_to_default_content":
            return client.switchToDefaultContent();

        // WAIT CONDITIONS (4 tools)
        case "wait_for_element":
            return client.waitForElement(args.by, args.value, args.timeout);
        case "wait_for_element_visible":
            return client.waitForElementVisible(args.by, args.value, args.timeout);
        case "wait_for_element_clickable":
            return client.waitForElementClickable(args.by, args.value, args.timeout);
        case "wait_for_text_present":
            return client.waitForTextPresent(args.by, args.value, args.text, args.timeout);

        // AI-OPTIMIZED DISCOVERY TOOLS (5 tools)
        case "get_all_links":
            return client.getAllLinks();
        case "get_all_forms":
            return client.getAllForms();
        case "get_all_buttons":
            return client.getAllButtons();
        case "get_page_summary":
            return client.getPageSummary();
        case "validate_selectors":
            return client.validateSelectors(args.selectors);

        // ACCESSIBILITY (1 tool)
        case "run_accessibility_scan":
            return client.runAccessibilityScan(args.contextSelector ?? null, args.axeOptions ?? {}, args.savePath);

        // CONSOLE / BROWSER LOGS (1 tool)
        case "get_browser_console":
            return client.getBrowserConsole(args.level, args.since);

        default:
            throw new Error(`Unknown tool: ${toolName}`);
    }
}
