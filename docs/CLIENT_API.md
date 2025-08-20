# Client API — `src/selenium-client`

This file documents the primary classes exported by `src/selenium-client` and the common methods you can call on them. The project exports a high-level `SeleniumClient` and several managers for advanced usage.

SeleniumClient (high-level)

Construct and use the client to control browsers and interact with pages. Important methods:

- Browser management
  - `startBrowser(browser?: string, options?: BrowserOptions)` — starts a browser and attaches a WebDriver instance.
  - `closeBrowser()` — closes and clears the driver.
  - `maximizeWindow()`, `minimizeWindow()`, `setWindowSize(width, height)`, `getWindowSize()`

- Navigation
  - `navigate(url)`, `getCurrentUrl()`, `getTitle()`, `refresh()`, `goBack()`, `goForward()`, `getPageSource()`, `takeScreenshot(path?)`, `executeScript(script, args?)`

- Element location
  - `findElement(by, value, timeout?)`, `findElements(by, value, timeout?)`
  - `waitForElement`, `waitForElementVisible`, `waitForElementClickable`, `waitForTextPresent`
  - `scrollToElement`, `validateSelectors(selectors)`

- Element interaction
  - `clickElement`, `sendKeys`, `clearElement`, `uploadFile`, `doubleClickElement`, `rightClickElement`, `hoverElement`, `dragAndDrop`

- Element inspection
  - `getElementText`, `getElementAttribute`, `getElementProperty`, `getElementCssValue`, `isElementDisplayed`, `isElementEnabled`, `isElementSelected`

- Actions
  - `pressKey(key)`, `pressKeyCombo(keys)`

- Window management
  - `switchToFrame`, `switchToDefaultContent`, `switchToWindow`, `getWindowHandles`, `getCurrentWindowHandle`, `closeCurrentWindow`, `openNewWindow(type?)`

- Page analysis
  - `getAllLinks`, `getAllForms`, `getAllButtons`, `getPageSummary`, `getPageMetadata`

Managers (advanced)

You can import managers directly for fine-grained control:

- `BrowserManager` — low-level browser operations and driver lifecycle.
- `NavigationManager` — navigation and script execution helpers.
- `ElementLocator` — locating and waiting for elements.
- `ElementInteractor` — clicking, typing, uploading files, and other interactions.
- `ElementInspector` — read-only inspections (text, attributes, css, properties).
- `ActionManager` — keyboard and advanced interactions.
- `WindowManager` — frame and window/tab handling.
- `PageAnalyzer` — collects links, forms, buttons and page metadata.

Types

Refer to `src/selenium-client/types.ts` for types and interfaces such as `BrowserOptions`, `LocatorStrategy`, `SeleniumResponse`, `ElementInfo`, `PageSummary` and others.

Notes

- Most methods return a JSON-like response object (see `SeleniumResponse` in `types.ts`) rather than throwing on errors. Check `success` and `message` fields where appropriate.
- Timeouts default to 10s for waiting methods; pass a custom `timeout` (ms) when needed.
