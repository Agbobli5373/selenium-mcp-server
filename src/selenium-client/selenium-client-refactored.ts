import { WebDriver, WebElement } from 'selenium-webdriver';
import { BrowserOptions, LocatorStrategy, SeleniumResponse } from './types.js';

import { ActionManager, BrowserManager, ElementInspector, ElementInteractor, ElementLocator, NavigationManager, PageAnalyzer, WindowManager } from './index.js';

export class SeleniumClient {
    private driver: WebDriver | null = null;
    private browserManager: BrowserManager;
    private navigationManager: NavigationManager;
    private elementLocator: ElementLocator;
    private elementInteractor: ElementInteractor;
    private elementInspector: ElementInspector;
    private actionManager: ActionManager;
    private windowManager: WindowManager;
    private pageAnalyzer: PageAnalyzer;

    constructor() {
        this.browserManager = new BrowserManager();
        this.navigationManager = new NavigationManager();
        this.elementLocator = new ElementLocator();
        this.elementInteractor = new ElementInteractor();
        this.elementInspector = new ElementInspector();
        this.actionManager = new ActionManager();
        this.windowManager = new WindowManager();
        this.pageAnalyzer = new PageAnalyzer();
    }

    private updateAllManagers(): void {
        this.browserManager.setDriver(this.driver);
        this.navigationManager.setDriver(this.driver);
        this.elementLocator.setDriver(this.driver);
        this.elementInteractor.setDriver(this.driver);
        this.elementInspector.setDriver(this.driver);
        this.actionManager.setDriver(this.driver);
        this.windowManager.setDriver(this.driver);
        this.pageAnalyzer.setDriver(this.driver);
    }

    // Browser Management
    async startBrowser(browser: string = 'chrome', options: BrowserOptions = {}): Promise<SeleniumResponse> {
        const result = await this.browserManager.startBrowser(browser, options);
        if (result.driver) {
            this.driver = result.driver;
            this.updateAllManagers();
        }
        return { success: result.success, message: result.message };
    }

    async closeBrowser(): Promise<SeleniumResponse> {
        const result = await this.browserManager.closeBrowser();
        this.driver = null;
        this.updateAllManagers();
        return result;
    }

    async maximizeWindow(): Promise<SeleniumResponse> {
        return this.browserManager.maximizeWindow();
    }

    async minimizeWindow(): Promise<SeleniumResponse> {
        return this.browserManager.minimizeWindow();
    }

    async setWindowSize(width: number, height: number): Promise<SeleniumResponse> {
        return this.browserManager.setWindowSize(width, height);
    }

    async getWindowSize(): Promise<{ width: number; height: number }> {
        return this.browserManager.getWindowSize();
    }

    // Navigation
    async navigate(url: string): Promise<SeleniumResponse & { url: string }> {
        return this.navigationManager.navigate(url);
    }

    async getCurrentUrl(): Promise<{ url: string }> {
        return this.navigationManager.getCurrentUrl();
    }

    async getTitle(): Promise<{ title: string }> {
        return this.navigationManager.getTitle();
    }

    async refresh(): Promise<SeleniumResponse> {
        return this.navigationManager.refresh();
    }

    async goBack(): Promise<SeleniumResponse> {
        return this.navigationManager.goBack();
    }

    async goForward(): Promise<SeleniumResponse> {
        return this.navigationManager.goForward();
    }

    async getPageSource(): Promise<{ source: string }> {
        return this.navigationManager.getPageSource();
    }

    async takeScreenshot(outputPath?: string): Promise<SeleniumResponse & { path?: string }> {
        return this.navigationManager.takeScreenshot(outputPath);
    }

    async executeScript(script: string, args: any[] = []): Promise<{ result: any }> {
        return this.navigationManager.executeScript(script, args);
    }

    // Element Location
    async findElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ found: boolean; message: string }> {
        return this.elementLocator.findElement(by, value, timeout);
    }

    async findElements(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ count: number; message: string }> {
        return this.elementLocator.findElements(by, value, timeout);
    }

    async waitForElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementLocator.waitForElement(by, value, timeout);
    }

    async waitForElementVisible(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementLocator.waitForElementVisible(by, value, timeout);
    }

    async waitForElementClickable(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementLocator.waitForElementClickable(by, value, timeout);
    }

    async waitForTextPresent(by: LocatorStrategy, value: string, text: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementLocator.waitForTextPresent(by, value, text, timeout);
    }

    async scrollToElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementLocator.scrollToElement(by, value, timeout);
    }

    async validateSelectors(selectors: Array<{ by: string; value: string }>): Promise<{
        results: Array<{ selector: { by: string; value: string }; found: boolean; count: number; error?: string }>
    }> {
        return this.elementLocator.validateSelectors(selectors);
    }

    // Element Interaction
    async clickElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.clickElement(by, value, timeout);
    }

    async sendKeys(by: LocatorStrategy, value: string, text: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.sendKeys(by, value, text, timeout);
    }

    async clearElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.clearElement(by, value, timeout);
    }

    async uploadFile(by: LocatorStrategy, value: string, filePath: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.uploadFile(by, value, filePath, timeout);
    }

    async doubleClickElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.doubleClickElement(by, value, timeout);
    }

    async rightClickElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.rightClickElement(by, value, timeout);
    }

    async hoverElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        return this.elementInteractor.hoverElement(by, value, timeout);
    }

    async dragAndDrop(
        sourceBy: LocatorStrategy,
        sourceValue: string,
        targetBy: LocatorStrategy,
        targetValue: string,
        timeout: number = 10000
    ): Promise<SeleniumResponse> {
        return this.elementInteractor.dragAndDrop(sourceBy, sourceValue, targetBy, targetValue, timeout);
    }

    // Element Inspection
    async getElementText(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ text: string }> {
        return this.elementInspector.getElementText(by, value, timeout);
    }

    async getElementAttribute(by: LocatorStrategy, value: string, attribute: string, timeout: number = 10000): Promise<{ attribute: string; value: string | null }> {
        return this.elementInspector.getElementAttribute(by, value, attribute, timeout);
    }

    async getElementProperty(by: LocatorStrategy, value: string, property: string, timeout: number = 10000): Promise<{ property: string; value: any }> {
        return this.elementInspector.getElementProperty(by, value, property, timeout);
    }

    async getElementCssValue(by: LocatorStrategy, value: string, cssProperty: string, timeout: number = 10000): Promise<{ property: string; value: string }> {
        return this.elementInspector.getElementCssValue(by, value, cssProperty, timeout);
    }

    async isElementDisplayed(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ displayed: boolean }> {
        return this.elementInspector.isElementDisplayed(by, value, timeout);
    }

    async isElementEnabled(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ enabled: boolean }> {
        return this.elementInspector.isElementEnabled(by, value, timeout);
    }

    async isElementSelected(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ selected: boolean }> {
        return this.elementInspector.isElementSelected(by, value, timeout);
    }

    // Actions
    async pressKey(key: string): Promise<SeleniumResponse> {
        return this.actionManager.pressKey(key);
    }

    async pressKeyCombo(keys: string[]): Promise<SeleniumResponse> {
        return this.actionManager.pressKeyCombo(keys);
    }

    // Window Management
    async switchToFrame(frameReference: string | number | WebElement): Promise<SeleniumResponse> {
        return this.windowManager.switchToFrame(frameReference);
    }

    async switchToDefaultContent(): Promise<SeleniumResponse> {
        return this.windowManager.switchToDefaultContent();
    }

    async switchToWindow(windowHandle: string): Promise<SeleniumResponse> {
        return this.windowManager.switchToWindow(windowHandle);
    }

    async getWindowHandles(): Promise<{ handles: string[] }> {
        return this.windowManager.getWindowHandles();
    }

    async getCurrentWindowHandle(): Promise<{ handle: string }> {
        return this.windowManager.getCurrentWindowHandle();
    }

    async closeCurrentWindow(): Promise<SeleniumResponse> {
        return this.windowManager.closeCurrentWindow();
    }

    async openNewWindow(type: 'tab' | 'window' = 'tab'): Promise<SeleniumResponse & { handle: string }> {
        return this.windowManager.openNewWindow(type);
    }

    // Page Analysis
    async getAllLinks(): Promise<{ links: Array<{ text: string; href: string; selector: string }> }> {
        return this.pageAnalyzer.getAllLinks();
    }

    async getAllForms(): Promise<{ forms: Array<{ action: string; method: string; fields: Array<{ name: string; type: string; label: string; selector: string }> }> }> {
        return this.pageAnalyzer.getAllForms();
    }

    async getAllButtons(): Promise<{ buttons: Array<{ text: string; type: string; selector: string }> }> {
        return this.pageAnalyzer.getAllButtons();
    }

    async getPageSummary(): Promise<{
        title: string;
        url: string;
        forms: number;
        links: number;
        buttons: number;
        inputs: number;
        images: number;
        headings: Array<{ level: string; text: string }>;
        mainContent: string;
    }> {
        return this.pageAnalyzer.getPageSummary();
    }

    async getPageMetadata(): Promise<{
        title: string;
        description: string;
        keywords: string;
        viewport: string;
        charset: string;
        language: string;
    }> {
        return this.pageAnalyzer.getPageMetadata();
    }
}

// Maintain backward compatibility by exporting the interfaces
export type { BrowserOptions, LocatorStrategy };
