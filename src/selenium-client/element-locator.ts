import { By, until } from 'selenium-webdriver';
import { LocatorStrategy, SeleniumResponse, BaseManager, SelectorValidationResult } from './types.js';

export class ElementLocator extends BaseManager {
    getByLocator(by: LocatorStrategy, value: string): By {
        switch (by) {
            case 'id':
                return By.id(value);
            case 'css':
                return By.css(value);
            case 'xpath':
                return By.xpath(value);
            case 'name':
                return By.name(value);
            case 'tag':
                // Use CSS selector for tag names since By.tagName is deprecated
                return By.css(value);
            case 'class':
                return By.className(value);
            case 'linkText':
                return By.linkText(value);
            case 'partialLinkText':
                return By.partialLinkText(value);
            default:
                throw new Error(`Unsupported locator strategy: ${by}`);
        }
    }

    async findElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ found: boolean; message: string }> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            await this.driver!.wait(until.elementLocated(locator), timeout);
            return { found: true, message: 'Element found successfully' };
        } catch (error) {
            return { found: false, message: `Element not found: ${error instanceof Error ? error.message : String(error)}` };
        }
    }

    async findElements(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<{ count: number; message: string }> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            // Wait a bit for elements to load
            await new Promise(resolve => setTimeout(resolve, Math.min(timeout, 1000)));
            const elements = await this.driver!.findElements(locator);
            return { count: elements.length, message: `Found ${elements.length} elements` };
        } catch (error) {
            throw new Error(`Failed to find elements: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async waitForElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            await this.driver!.wait(until.elementLocated(locator), timeout);
            return { success: true, message: 'Element found within timeout' };
        } catch (error) {
            throw new Error(`Element not found within timeout: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async waitForElementVisible(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            await this.driver!.wait(until.elementIsVisible(this.driver!.findElement(locator)), timeout);
            return { success: true, message: 'Element became visible within timeout' };
        } catch (error) {
            throw new Error(`Element did not become visible within timeout: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async waitForElementClickable(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await this.driver!.wait(until.elementIsEnabled(element), timeout);
            return { success: true, message: 'Element became clickable within timeout' };
        } catch (error) {
            throw new Error(`Element did not become clickable within timeout: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async waitForTextPresent(by: LocatorStrategy, value: string, text: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            await this.driver!.wait(until.elementTextContains(this.driver!.findElement(locator), text), timeout);
            return { success: true, message: `Text '${text}' found in element within timeout` };
        } catch (error) {
            throw new Error(`Text '${text}' not found in element within timeout: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async scrollToElement(by: LocatorStrategy, value: string, timeout: number = 10000): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            const locator = this.getByLocator(by, value);
            const element = await this.driver!.wait(until.elementLocated(locator), timeout);
            await this.driver!.executeScript('arguments[0].scrollIntoView(true);', element);
            return { success: true, message: 'Scrolled to element successfully' };
        } catch (error) {
            throw new Error(`Failed to scroll to element: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async validateSelectors(selectors: Array<{ by: string; value: string }>): Promise<{
        results: Array<SelectorValidationResult>
    }> {
        this.ensureDriverExists();
        try {
            const results: Array<SelectorValidationResult> = [];

            for (const selector of selectors) {
                try {
                    const locator = this.getByLocator(selector.by as LocatorStrategy, selector.value);
                    const elements = await this.driver!.findElements(locator);

                    results.push({
                        selector,
                        found: elements.length > 0,
                        count: elements.length
                    });
                } catch (error) {
                    results.push({
                        selector,
                        found: false,
                        count: 0,
                        error: error instanceof Error ? error.message : String(error)
                    });
                }
            }

            return { results };
        } catch (error) {
            throw new Error(`Failed to validate selectors: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
