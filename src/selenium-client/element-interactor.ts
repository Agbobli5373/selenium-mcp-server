import { until } from 'selenium-webdriver';
import { LocatorStrategy, SeleniumResponse, BaseManager } from './types.js';
import { ElementLocator } from './element-locator.js';

export class ElementInteractor extends BaseManager {
    private elementLocator: ElementLocator;

    constructor() {
        super();
        this.elementLocator = new ElementLocator();
    }

    setDriver(driver: any): void {
        super.setDriver(driver);
        this.elementLocator.setDriver(driver);
    }

    async clickElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await this.driver!.wait(until.elementIsEnabled(element), timeout);
            await element.click();
            return { success: true, message: 'Element clicked successfully' };
        } catch (error) {
            throw new Error(`Failed to click element: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async sendKeys(by: LocatorStrategy, value: string, text: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await this.driver!.wait(until.elementIsEnabled(element), timeout);
            await element.sendKeys(text);
            return { success: true, message: 'Text sent successfully' };
        } catch (error) {
            throw new Error(`Failed to send keys: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async clearElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await element.clear();
            return { success: true, message: 'Element cleared successfully' };
        } catch (error) {
            throw new Error(`Failed to clear element: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async uploadFile(by: LocatorStrategy, value: string, filePath: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);

            // Check if file exists
            const fs = await import('fs');
            const path = await import('path');

            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            // Convert to absolute path if needed
            const absolutePath = path.resolve(filePath);

            await element.sendKeys(absolutePath);
            return { success: true, message: `File uploaded successfully: ${absolutePath}` };
        } catch (error) {
            throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async doubleClickElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await this.driver!.wait(until.elementIsEnabled(element), timeout);
            const actions = this.driver!.actions({ bridge: true });
            await actions.doubleClick(element).perform();
            return { success: true, message: 'Double clicked element successfully' };
        } catch (error) {
            throw new Error(`Failed to double click element: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async rightClickElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await this.driver!.wait(until.elementIsEnabled(element), timeout);
            const actions = this.driver!.actions({ bridge: true });
            await actions.contextClick(element).perform();
            return { success: true, message: 'Right clicked element successfully' };
        } catch (error) {
            throw new Error(`Failed to right click element: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async hoverElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const actions = this.driver!.actions({ bridge: true });
            await actions.move({ origin: element }).perform();
            return { success: true, message: 'Hovered over element successfully' };
        } catch (error) {
            throw new Error(`Failed to hover over element: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async dragAndDrop(
        sourceBy: LocatorStrategy,
        sourceValue: string,
        targetBy: LocatorStrategy,
        targetValue: string,
        timeout: number = 10000
    ): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const sourceLocator = this.elementLocator.getByLocator(sourceBy, sourceValue);
            const targetLocator = this.elementLocator.getByLocator(targetBy, targetValue);
            const sourceElement = await this.driver!.wait(until.elementLocated(sourceLocator), timeout);
            const targetElement = await this.driver!.wait(until.elementLocated(targetLocator), timeout);

            const actions = this.driver!.actions({ bridge: true });
            await actions.dragAndDrop(sourceElement, targetElement).perform();
            return { success: true, message: 'Drag and drop completed successfully' };
        } catch (error) {
            throw new Error(`Failed to perform drag and drop: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
