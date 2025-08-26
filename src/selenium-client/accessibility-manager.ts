import fs from "fs";
import path from "path";
import { WebDriver, Key } from "selenium-webdriver";
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

  async saveScreenshot(savePath: string) {
    if (!this.driver) {
      throw new Error("Driver not set on AccessibilityManager");
    }
    // driver.takeScreenshot() returns a base64-encoded PNG
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await (this.driver as any).takeScreenshot();
    const outDir = path.dirname(savePath);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(savePath, data, "base64");
    return savePath;
  }

  async setViewport(width: number, height: number) {
    if (!this.driver) {
      throw new Error("Driver not set on AccessibilityManager");
    }
    // Use the WebDriver window management API to set viewport size
    // setRect is supported by selenium-webdriver
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (this.driver as any).manage().window().setRect({ width, height });
  }

  /**
   * Convenience wrapper to run axe with multiple tag groups (e.g., wcag21, best-practice, experimental)
   */
  async runExpandedAxeScan(tags: string[], savePath?: string) {
    return this.runAxeScan(null, { runOnly: { type: "tag", values: tags } }, savePath);
  }

  /**
   * Highlight violations on the page by adding a red outline to each failing target.
   * Results should be the axe results object (the 'results' property returned by runAxeScan).
   */
  async highlightViolations(results: any) {
    if (!this.driver) {
      throw new Error("Driver not set on AccessibilityManager");
    }
    try {
      // Execute in-page script to add outlines for each target selector reported by axe
      // Note: some targets can be XPath-like; querySelectorAll may fail for those — we ignore failures.
      await this.driver.executeScript(
        // browser context
        function (res: any) {
          if (!res || !res.violations) return;
          res.violations.forEach(function (v: any, vi: number) {
            v.nodes.forEach(function (n: any, ni: number) {
              if (!n.target) return;
              n.target.forEach(function (t: string) {
                try {
                  const els = document.querySelectorAll(t);
                  els.forEach(function (el: Element) {
                    (el as HTMLElement).style.outline = "3px solid rgba(255,0,0,0.8)";
                    (el as HTMLElement).style.boxShadow = "0 0 0 3px rgba(255,0,0,0.2)";
                  });
                } catch (e) {
                  // ignore selectors that can't be used with querySelectorAll
                }
              });
            });
          });
        },
        results
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Failed to highlight violations:", e);
    }
  }

  /**
   * Perform a simple keyboard navigation smoke test by sending TAB keys and recording the activeElement.
   * Returns an array of HTML strings representing the focused element after each tab.
   */
  async runKeyboardNavigationTest(steps: number = 20) {
    if (!this.driver) {
      throw new Error("Driver not set on AccessibilityManager");
    }
    const sequence: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (let i = 0; i < steps; i++) {
      // send a single Tab key press
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (this.driver as any).actions().sendKeys(Key.TAB).perform();
      const html = await this.driver.executeScript(
        "return document.activeElement ? document.activeElement.outerHTML : null;"
      );
      sequence.push(html as string);
    }
    return sequence;
  }
}
