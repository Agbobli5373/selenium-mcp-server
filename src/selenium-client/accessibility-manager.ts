import fs from "fs";
import path from "path";
import { WebDriver } from "selenium-webdriver";
import axe from "axe-core";

export class AccessibilityManager {
  private driver: WebDriver | null = null;

  setDriver(driver: WebDriver | null) {
    this.driver = driver;
  }

  /**
   * Run an axe-core accessibility scan on the current page.
   *
   * @param contextSelector Optional CSS selector string to scope the scan (null => whole document)
   * @param axeOptions Optional axe.run options object
   * @param savePath Optional filesystem path where JSON results will be written
   */
  async runAxeScan(contextSelector: string | null = null, axeOptions: any = {}, savePath?: string) {
    if (!this.driver) {
      throw new Error("Driver not set on AccessibilityManager");
    }

    // Inject axe-core into the page by evaluating the axe source string
    // axe.source is the IIFE script string provided by the axe-core package
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const source = (axe as any).source as string;
    if (!source) {
      throw new Error("Unable to locate axe-core source");
    }

    await this.driver.executeScript(source);

    // Execute axe.run in the browser. We pass the selector (or null) and options.
    // The browser-side function will call the Vitest/Node callback with a single payload.
    const payload: any = await this.driver.executeAsyncScript(
      // function executed in browser context
      function (selector: string | null, options: any, done: (r: any) => void) {
        try {
          const ctx = selector ? (globalThis as any).document.querySelector(selector) : (globalThis as any).document;
          // @ts-ignore window.axe is injected by axe.source
          (window as any).axe.run(ctx || (globalThis as any).document, options || {}, function (err: any, results: any) {
            if (err) {
              done({ error: err && err.message ? err.message : String(err) });
            } else {
              done({ results });
            }
          });
        } catch (e) {
          done({ error: e && (e as Error).message ? (e as Error).message : String(e) });
        }
      },
      contextSelector,
      axeOptions
    );

    // Optionally persist results to disk
    try {
      if (payload && payload.results && savePath) {
        const outDir = path.dirname(savePath);
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(savePath, JSON.stringify(payload.results, null, 2), "utf-8");
      }
    } catch (e) {
      // don't crash the caller if saving fails; attach a warning instead
      // eslint-disable-next-line no-console
      console.error("Failed to save axe results:", e);
    }

    return payload;
  }
}
