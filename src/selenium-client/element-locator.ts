import { By, until } from 'selenium-webdriver';
import { LocatorStrategy, SeleniumResponse, BaseManager, SelectorValidationResult } from './types.js';

/**
 * ElementLocator
 *
 * A helper manager that provides common element-finding, waiting and validation utilities
 * built on top of Selenium WebDriver. This class expects to run within a context where
 * a WebDriver instance is managed by the BaseManager (e.g. via `this.driver`) and `ensureDriverExists()`
 * will throw if no driver is available.
 *
 * Key responsibilities:
 * - Translate a lightweight locator strategy (LocatorStrategy) into a Selenium `By` locator.
 * - Provide convenience methods to wait for elements to be present, visible, enabled/clickable,
 *   or containing specific text.
 * - Provide utilities to find one or many elements and to validate an array of selectors.
 * - Provide a scroll-to-element helper that runs a client-side scrollIntoView.
 *
 * Notes:
 * - All waiting methods accept an optional `timeout` (milliseconds) defaulting to 10000 (10s).
 * - The `'tag'` locator strategy uses a CSS selector (`By.css`) because `By.tagName` is treated as deprecated.
 * - Errors thrown include the original error message when available to aid debugging.
 *
 * Supported locator strategies:
 * - 'id' | 'css' | 'xpath' | 'name' | 'tag' | 'class' | 'linkText' | 'partialLinkText'
 *
 * Methods
 * - getByLocator(by, value)
 *   - @param by - Locator strategy key (see supported strategies above).
 *   - @param value - The selector or locator value to convert into a Selenium `By`.
 *   - @returns Selenium `By` corresponding to the provided strategy and value.
 *   - @throws Error when an unsupported locator strategy is supplied.
 *
 * - findElement(by, value, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param timeout - Optional: milliseconds to wait for the element to be located (default 10000).
 *   - @returns Promise resolving to an object: { found: boolean; message: string }.
 *   - @remarks Waits for the element to be located using `until.elementLocated`. On success returns
 *     { found: true, message: 'Element found successfully' }; on failure returns { found: false, message: <error> }.
 *
 * - findElements(by, value, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param timeout - Optional: maximum milliseconds to wait briefly for elements to load (default 10000, but actual short sleep capped to 1000ms).
 *   - @returns Promise resolving to an object: { count: number; message: string }.
 *   - @remarks Performs a short delay then calls `findElements` and returns how many were found. Throws an Error on unexpected failures.
 *
 * - waitForElement(by, value, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param timeout - Optional milliseconds to wait (default 10000).
 *   - @returns Promise resolving to SeleniumResponse { success: true; message: string } when element becomes present.
 *   - @throws Error when the element does not appear within the timeout.
 *
 * - waitForElementVisible(by, value, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param timeout - Optional milliseconds to wait (default 10000).
 *   - @returns Promise resolving to SeleniumResponse when the element becomes visible.
 *   - @throws Error when the element does not become visible within the timeout.
 *   - @remarks Uses `until.elementIsVisible(this.driver.findElement(locator))`.
 *
 * - waitForElementClickable(by, value, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param timeout - Optional milliseconds to wait (default 10000).
 *   - @returns Promise resolving to SeleniumResponse when the element is located and enabled.
 *   - @throws Error when the element is not clickable within the timeout.
 *   - @remarks Waits for the element to be located and then checks `elementIsEnabled`.
 *
 * - waitForTextPresent(by, value, text, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param text - The text expected to be present in the element.
 *   - @param timeout - Optional milliseconds to wait (default 10000).
 *   - @returns Promise resolving to SeleniumResponse when the text is present.
 *   - @throws Error when the text is not found within the timeout.
 *   - @remarks Uses `until.elementTextContains(this.driver.findElement(locator), text)`.
 *
 * - scrollToElement(by, value, timeout?)
 *   - @param by - Locator strategy.
 *   - @param value - Locator value.
 *   - @param timeout - Optional milliseconds to wait for the element to be located (default 10000).
 *   - @returns Promise resolving to SeleniumResponse after executing a client-side scrollIntoView on the element.
 *   - @throws Error when scrolling fails or the element cannot be located.
 *
 * - validateSelectors(selectors)
 *   - @param selectors - Array of objects { by: string; value: string } representing selectors to validate.
 *   - @returns Promise resolving to an object: { results: Array<SelectorValidationResult> }.
 *   - @remarks Iterates each selector, attempts to locate elements and returns per-selector results:
 *     { selector, found: boolean, count: number, error?: string }.
 *     Individual selector failures are captured per-result rather than aborting the whole validation pass.
 *
 * Example
 * @example
 * // Typical usage (assuming `locator` is an instance of ElementLocator and driver is initialized):
 * // await locator.findElement('css', '.my-class', 5000);
 * // await locator.waitForElementVisible('id', 'submit', 10000);
 *
 * @public
 */
export class ElementLocator extends BaseManager {
    /**
     * Returns a Selenium `By` locator for the specified locator strategy and value.
     *
     * Supported strategies:
     * - `'id'`             -> `By.id(value)`
     * - `'css'`            -> `By.css(value)`
     * - `'xpath'`          -> `By.xpath(value)`
     * - `'name'`           -> `By.name(value)`
     * - `'tag'`            -> `By.css(value)` (uses CSS selector because `By.tagName` is deprecated)
     * - `'class'`          -> `By.className(value)`
     * - `'linkText'`       -> `By.linkText(value)`
     * - `'partialLinkText'`-> `By.partialLinkText(value)`
     *
     * @param by - The locator strategy to use (e.g. 'id', 'css', 'xpath', etc.).
     * @param value - The locator value (selector, id, xpath expression, link text, etc.).
     * @returns A `By` object corresponding to the chosen strategy and provided value.
     * @throws {Error} If an unsupported locator strategy is supplied.
     */
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
