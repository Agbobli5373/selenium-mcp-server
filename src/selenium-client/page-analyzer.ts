import { By } from 'selenium-webdriver';
import { PageSummary, LinkInfo, FormInfo, FormField, ButtonInfo, BaseManager } from './types.js';

export class PageAnalyzer extends BaseManager {
    async getAllLinks(): Promise<{ links: Array<LinkInfo> }> {
        this.ensureDriverExists();
        try {
            const links = await this.driver!.findElements(By.css('a[href]'));
            const linkData: LinkInfo[] = [];

            for (let i = 0; i < Math.min(links.length, 50); i++) { // Limit to 50 links
                const link = links[i];
                const text = await link.getText();
                const href = await link.getAttribute('href');
                const id = await link.getAttribute('id');
                const className = await link.getAttribute('class');

                // Generate best selector
                let selector = '';
                if (id) {
                    selector = `#${id}`;
                } else if (className) {
                    selector = `.${className.split(' ')[0]}`;
                } else {
                    selector = `a[href="${href}"]`;
                }

                linkData.push({
                    text: text.trim(),
                    href: href || '',
                    selector
                });
            }

            return { links: linkData };
        } catch (error) {
            throw new Error(`Failed to get all links: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getAllForms(): Promise<{ forms: Array<FormInfo> }> {
        this.ensureDriverExists();
        try {
            const forms = await this.driver!.findElements(By.css('form'));
            const formData: FormInfo[] = [];

            for (const form of forms) {
                const action = await form.getAttribute('action') || '';
                const method = await form.getAttribute('method') || 'GET';

                // Get all form fields
                const inputs = await form.findElements(By.css('input, select, textarea'));
                const fields: FormField[] = [];

                for (const input of inputs) {
                    const name = await input.getAttribute('name') || '';
                    const type = await input.getAttribute('type') || 'text';
                    const id = await input.getAttribute('id') || '';
                    const placeholder = await input.getAttribute('placeholder') || '';

                    // Try to find associated label
                    let label = '';
                    if (id) {
                        try {
                            const labelElement = await this.driver!.findElement(By.css(`label[for="${id}"]`));
                            label = await labelElement.getText();
                        } catch {
                            // No label found
                        }
                    }

                    // Generate selector
                    let selector = '';
                    if (id) {
                        selector = `#${id}`;
                    } else if (name) {
                        selector = `[name="${name}"]`;
                    } else {
                        selector = `[type="${type}"]`;
                    }

                    fields.push({
                        name,
                        type,
                        label: label || placeholder,
                        selector
                    });
                }

                formData.push({
                    action,
                    method,
                    fields
                });
            }

            return { forms: formData };
        } catch (error) {
            throw new Error(`Failed to get all forms: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getAllButtons(): Promise<{ buttons: Array<ButtonInfo> }> {
        this.ensureDriverExists();
        try {
            const buttons = await this.driver!.findElements(By.css('button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"]'));
            const buttonData: ButtonInfo[] = [];

            for (const button of buttons) {
                const text = await button.getText() || await button.getAttribute('value') || '';
                const type = await button.getAttribute('type') || 'button';
                const id = await button.getAttribute('id');
                const className = await button.getAttribute('class');

                // Generate best selector
                let selector = '';
                if (id) {
                    selector = `#${id}`;
                } else if (className) {
                    selector = `.${className.split(' ')[0]}`;
                } else if (text) {
                    selector = `button:contains("${text}")`;
                } else {
                    selector = `[type="${type}"]`;
                }

                buttonData.push({
                    text: text.trim(),
                    type,
                    selector
                });
            }

            return { buttons: buttonData };
        } catch (error) {
            throw new Error(`Failed to get all buttons: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getPageSummary(): Promise<PageSummary> {
        this.ensureDriverExists();
        try {
            const title = await this.driver!.getTitle();
            const url = await this.driver!.getCurrentUrl();

            // Count elements
            const forms = await this.driver!.findElements(By.css('form'));
            const links = await this.driver!.findElements(By.css('a[href]'));
            const buttons = await this.driver!.findElements(By.css('button, input[type="button"], input[type="submit"]'));
            const inputs = await this.driver!.findElements(By.css('input, select, textarea'));
            const images = await this.driver!.findElements(By.css('img'));

            // Get headings
            const headingElements = await this.driver!.findElements(By.css('h1, h2, h3, h4, h5, h6'));
            const headings = [];
            for (const heading of headingElements.slice(0, 10)) { // Limit to 10 headings
                const tagName = await heading.getTagName();
                const text = await heading.getText();
                headings.push({
                    level: tagName.toUpperCase(),
                    text: text.trim()
                });
            }

            // Get main content (try to find main content area)
            let mainContent = '';
            try {
                const mainElement = await this.driver!.findElement(By.css('main, [role="main"], .main-content, #main-content'));
                mainContent = (await mainElement.getText()).substring(0, 500); // First 500 chars
            } catch {
                // Fallback to body content
                try {
                    const bodyElement = await this.driver!.findElement(By.css('body'));
                    mainContent = (await bodyElement.getText()).substring(0, 500);
                } catch {
                    mainContent = 'Could not extract main content';
                }
            }

            return {
                title,
                url,
                forms: forms.length,
                links: links.length,
                buttons: buttons.length,
                inputs: inputs.length,
                images: images.length,
                headings,
                mainContent
            };
        } catch (error) {
            throw new Error(`Failed to get page summary: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    async getPageMetadata(): Promise<{
        title: string;
        description: string;
        keywords: string;
        viewport: string;
        charset: string;
        language: string;
    }> {
        this.ensureDriverExists();
        try {
            const title = await this.driver!.getTitle();
            
            let description = '';
            try {
                const descElement = await this.driver!.findElement(By.css('meta[name="description"]'));
                description = await descElement.getAttribute('content') || '';
            } catch {
                // No description meta tag
            }

            let keywords = '';
            try {
                const keywordsElement = await this.driver!.findElement(By.css('meta[name="keywords"]'));
                keywords = await keywordsElement.getAttribute('content') || '';
            } catch {
                // No keywords meta tag
            }

            let viewport = '';
            try {
                const viewportElement = await this.driver!.findElement(By.css('meta[name="viewport"]'));
                viewport = await viewportElement.getAttribute('content') || '';
            } catch {
                // No viewport meta tag
            }

            let charset = '';
            try {
                const charsetElement = await this.driver!.findElement(By.css('meta[charset]'));
                charset = await charsetElement.getAttribute('charset') || '';
            } catch {
                // No charset meta tag
            }

            let language = '';
            try {
                const htmlElement = await this.driver!.findElement(By.css('html'));
                language = await htmlElement.getAttribute('lang') || '';
            } catch {
                // No language attribute
            }

            return {
                title,
                description,
                keywords,
                viewport,
                charset,
                language
            };
        } catch (error) {
            throw new Error(`Failed to get page metadata: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
}
