import { Builder, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';
import * as firefox from 'selenium-webdriver/firefox.js';
import * as edge from 'selenium-webdriver/edge.js';
import * as safari from 'selenium-webdriver/safari.js';
import { BrowserOptions, SeleniumResponse, BaseManager } from './types.js';

export class BrowserManager extends BaseManager {
    async startBrowser(browser: string = 'chrome', options: BrowserOptions = {}): Promise<SeleniumResponse & { driver?: WebDriver }> {
        try {
            if (this.driver) {
                await this.driver.quit();
            }

            let builder = new Builder();

            switch (browser.toLowerCase()) {
                case 'chrome':
                    builder = this.configureChromeOptions(builder, options);
                    break;
                case 'firefox':
                    builder = this.configureFirefoxOptions(builder, options);
                    break;
                case 'edge':
                    builder = this.configureEdgeOptions(builder, options);
                    break;
                case 'safari':
                    builder = this.configureSafariOptions(builder, options);
                    break;
                default:
                    throw new Error(`Unsupported browser: ${browser}`);
            }

            this.driver = await builder.build();

            if (options.windowSize && !options.headless) {
                await this.driver.manage().window().setRect({
                    width: options.windowSize.width,
                    height: options.windowSize.height,
                    x: 0,
                    y: 0
                });
            }

            return { 
                success: true, 
                message: `${browser} browser started successfully`,
                driver: this.driver
            };
        } catch (error) {
            throw new Error(`Failed to start browser: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async closeBrowser(): Promise<SeleniumResponse> {
        try {
            if (this.driver) {
                await this.driver.quit();
                this.driver = null;
                return { success: true, message: 'Browser closed successfully' };
            }
            return { success: true, message: 'No browser session to close' };
        } catch (error) {
            throw new Error(`Failed to close browser: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async maximizeWindow(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.manage().window().maximize();
            return { success: true, message: 'Window maximized successfully' };
        } catch (error) {
            throw new Error(`Failed to maximize window: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async minimizeWindow(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.manage().window().minimize();
            return { success: true, message: 'Window minimized successfully' };
        } catch (error) {
            throw new Error(`Failed to minimize window: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async setWindowSize(width: number, height: number): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.manage().window().setRect({ width, height, x: 0, y: 0 });
            return { success: true, message: `Window size set to ${width}x${height}` };
        } catch (error) {
            throw new Error(`Failed to set window size: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getWindowSize(): Promise<{ width: number; height: number }> {
        this.ensureDriverExists();
        try {
            const rect = await this.driver!.manage().window().getRect();
            return { width: rect.width, height: rect.height };
        } catch (error) {
            throw new Error(`Failed to get window size: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    private configureChromeOptions(builder: Builder, options: BrowserOptions): Builder {
        const chromeOptions = new chrome.Options();
        if (options.headless) {
            chromeOptions.addArguments('--headless');
        }
        if (options.arguments) {
            chromeOptions.addArguments(...options.arguments);
        }
        if (options.windowSize) {
            chromeOptions.addArguments(`--window-size=${options.windowSize.width},${options.windowSize.height}`);
        }
        return builder.forBrowser('chrome').setChromeOptions(chromeOptions);
    }

    private configureFirefoxOptions(builder: Builder, options: BrowserOptions): Builder {
        const firefoxOptions = new firefox.Options();
        if (options.headless) {
            firefoxOptions.addArguments('--headless');
        }
        if (options.arguments) {
            firefoxOptions.addArguments(...options.arguments);
        }
        return builder.forBrowser('firefox').setFirefoxOptions(firefoxOptions);
    }

    private configureEdgeOptions(builder: Builder, options: BrowserOptions): Builder {
        const edgeOptions = new edge.Options();
        if (options.headless) {
            edgeOptions.addArguments('--headless');
        }
        if (options.arguments) {
            edgeOptions.addArguments(...options.arguments);
        }
        return builder.forBrowser('MicrosoftEdge').setEdgeOptions(edgeOptions);
    }

    private configureSafariOptions(builder: Builder, options: BrowserOptions): Builder {
        const safariOptions = new safari.Options();
        if (options.arguments) {
            console.warn('Safari does not support custom arguments. Ignoring provided arguments.');
        }
        if (options.headless) {
            console.warn('Safari does not support headless mode. Running in normal mode.');
        }
        return builder.forBrowser('safari').setSafariOptions(safariOptions);
    }
}
