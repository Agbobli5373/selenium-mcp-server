import { WebElement } from 'selenium-webdriver';
import { SeleniumResponse, BaseManager } from './types.js';

export class WindowManager extends BaseManager {
    async switchToFrame(frameReference: string | number | WebElement): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            // Handle string input that might be a number
            let actualFrameReference: string | number | WebElement = frameReference;
            if (typeof frameReference === 'string') {
                // Try to parse as number if it's a numeric string
                const numericValue = parseInt(frameReference, 10);
                if (!isNaN(numericValue) && numericValue.toString() === frameReference) {
                    actualFrameReference = numericValue;
                }
            }

            await this.driver!.switchTo().frame(actualFrameReference);
            return { success: true, message: 'Switched to frame successfully' };
        } catch (error) {
            throw new Error(`Failed to switch to frame: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async switchToDefaultContent(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.switchTo().defaultContent();
            return { success: true, message: 'Switched to default content successfully' };
        } catch (error) {
            throw new Error(`Failed to switch to default content: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async switchToWindow(windowHandle: string): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.switchTo().window(windowHandle);
            return { success: true, message: 'Switched to window successfully' };
        } catch (error) {
            throw new Error(`Failed to switch to window: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getWindowHandles(): Promise<{ handles: string[] }> {
        this.ensureDriverExists();
        try {
            const handles = await this.driver!.getAllWindowHandles();
            return { handles };
        } catch (error) {
            throw new Error(`Failed to get window handles: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getCurrentWindowHandle(): Promise<{ handle: string }> {
        this.ensureDriverExists();
        try {
            const handle = await this.driver!.getWindowHandle();
            return { handle };
        } catch (error) {
            throw new Error(`Failed to get current window handle: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async closeCurrentWindow(): Promise<SeleniumResponse> {
        this.ensureDriverExists();
        try {
            await this.driver!.close();
            return { success: true, message: 'Current window closed successfully' };
        } catch (error) {
            throw new Error(`Failed to close current window: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async openNewWindow(type: 'tab' | 'window' = 'tab'): Promise<SeleniumResponse & { handle: string }> {
        this.ensureDriverExists();
        try {
            await this.driver!.switchTo().newWindow(type);
            const handle = await this.driver!.getWindowHandle();
            return { success: true, message: `New ${type} opened successfully`, handle };
        } catch (error) {
            throw new Error(`Failed to open new ${type}: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
