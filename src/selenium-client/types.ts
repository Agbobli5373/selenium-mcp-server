import { WebDriver, WebElement } from 'selenium-webdriver';

export interface BrowserOptions {
    headless?: boolean;
    arguments?: string[];
    windowSize?: { width: number; height: number };
}

export type LocatorStrategy = 'id' | 'css' | 'xpath' | 'name' | 'tag' | 'class' | 'linkText' | 'partialLinkText';

export interface SeleniumResponse {
    success: boolean;
    message: string;
}

export interface ElementInfo {
    text?: string;
    attribute?: string;
    value?: string | null;
    displayed?: boolean;
    enabled?: boolean;
    selected?: boolean;
}

export interface PageSummary {
    title: string;
    url: string;
    forms: number;
    links: number;
    buttons: number;
    inputs: number;
    images: number;
    headings: Array<{ level: string; text: string }>;
    mainContent: string;
}

export interface LinkInfo {
    text: string;
    href: string;
    selector: string;
}

export interface FormField {
    name: string;
    type: string;
    label: string;
    selector: string;
}

export interface FormInfo {
    action: string;
    method: string;
    fields: FormField[];
}

export interface ButtonInfo {
    text: string;
    type: string;
    selector: string;
}

export interface SelectorValidationResult {
    selector: { by: string; value: string };
    found: boolean;
    count: number;
    error?: string;
}

export abstract class BaseManager {
    protected driver: WebDriver | null = null;

    constructor(driver: WebDriver | null = null) {
        this.driver = driver;
    }

    setDriver(driver: WebDriver | null): void {
        this.driver = driver;
    }

    protected ensureDriverExists(): void {
        if (!this.driver) {
            throw new Error('Browser not started. Please call start_browser first.');
        }
    }
}
