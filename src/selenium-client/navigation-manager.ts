import { SeleniumResponse, BaseManager } from './types.js';

export class NavigationManager extends BaseManager {
    async navigate(url: string): Promise<SeleniumResponse & { url: string }> {
        this.ensureDriverExists();
        try {
            await this.driver!.get(url);
            const currentUrl = await this.driver!.getCurrentUrl();
            return { success: true, message: 'Navigation successful', url: currentUrl };
        } catch (error) {
            throw new Error(`Failed to navigate to ${url}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getCurrentUrl(): Promise<{ url: string }> {
        this.ensureDriverExists();
        try {
            const url = await this.driver!.getCurrentUrl();
            return { url };
        } catch (error) {
            throw new Error(`Failed to get current URL: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getTitle(): Promise<{ title: string }> {
        this.ensureDriverExists();
        try {
            const title = await this.driver!.getTitle();
            return { title };
        } catch (error) {
            throw new Error(`Failed to get page title: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async refresh(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.navigate().refresh();
            return { success: true, message: 'Page refreshed successfully' };
        } catch (error) {
            throw new Error(`Failed to refresh page: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async goBack(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.navigate().back();
            return { success: true, message: 'Navigated back successfully' };
        } catch (error) {
            throw new Error(`Failed to go back: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async goForward(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.navigate().forward();
            return { success: true, message: 'Navigated forward successfully' };
        } catch (error) {
            throw new Error(`Failed to go forward: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getPageSource(): Promise<{ source: string }> {
        this.ensureDriverExists();
        try {
            const source = await this.driver!.getPageSource();
            return { source };
        } catch (error) {
            throw new Error(`Failed to get page source: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async takeScreenshot(outputPath?: string): Promise<SeleniumResponse & { path?: string }> {
        this.ensureDriverExists();
        try {
            const screenshot = await this.driver!.takeScreenshot();

            if (outputPath) {
                const fs = await import('fs');
                fs.writeFileSync(outputPath, screenshot, 'base64');
                return { success: true, message: 'Screenshot saved successfully', path: outputPath };
            } else {
                return { success: true, message: 'Screenshot taken successfully (base64 data available)' };
            }
        } catch (error) {
            throw new Error(`Failed to take screenshot: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async executeScript(script: string, args: any[] = []): Promise<{ result: any }> {
        this.ensureDriverExists();
        try {
            const result = await this.driver!.executeScript(script, ...args);
            return { result };
        } catch (error) {
            throw new Error(`Failed to execute script: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
