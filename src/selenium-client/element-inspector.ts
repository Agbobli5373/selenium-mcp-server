import { until } from 'selenium-webdriver';
import { LocatorStrategy, BaseManager } from './types.js';
import { ElementLocator } from './element-locator.js';

export class ElementInspector extends BaseManager {
    private elementLocator: ElementLocator;

    constructor() {
        super();
        this.elementLocator = new ElementLocator();
    }

    setDriver(driver: any): void {
        super.setDriver(driver);
        this.elementLocator.setDriver(driver);
    }

    async getElementText(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ text: string }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const text = await element.getText();
            return { text };
        } catch (error) {
            throw new Error(`Failed to get element text: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getElementAttribute(by: LocatorStrategy, value: string, attribute: string, timeout: number = 10000): Promise<{ attribute: string; value: string | null }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const attrValue = await element.getAttribute(attribute);
            return { attribute, value: attrValue };
        } catch (error) {
            throw new Error(`Failed to get element attribute: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getElementProperty(by: LocatorStrategy, value: string, property: string, timeout: number = 10000): Promise<{ property: string; value: any }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            // Use getAttribute for properties like 'value', 'checked', etc.
            const propValue = await element.getAttribute(property);
            return { property, value: propValue };
        } catch (error) {
            throw new Error(`Failed to get element property: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getElementCssValue(by: LocatorStrategy, value: string, cssProperty: string, timeout: number = 10000): Promise<{ property: string; value: string }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const cssValue = await element.getCssValue(cssProperty);
            return { property: cssProperty, value: cssValue };
        } catch (error) {
            throw new Error(`Failed to get element CSS value: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async isElementDisplayed(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ displayed: boolean }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const displayed = await element.isDisplayed();
            return { displayed };
        } catch (error) {
            return { displayed: false };
        }
    }

    async isElementEnabled(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ enabled: boolean }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const enabled = await element.isEnabled();
            return { enabled };
        } catch (error) {
            return { enabled: false };
        }
    }

    async isElementSelected(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ selected: boolean }> {
        this.ensureDriverExists();
        try {
            const locator = this.elementLocator.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            const selected = await element.isSelected();
            return { selected };
        } catch (error) {
            return { selected: false };
        }
    }
}
