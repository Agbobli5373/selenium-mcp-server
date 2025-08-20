# Usage — selenium-mcp-server

Quick examples showing common flows using `SeleniumClient`.

Minimal example (Node + ESM)

```ts
import { SeleniumClient } from "../src/selenium-client/index.js";

const client = new SeleniumClient();

async function run() {
  await client.startBrowser("chrome");
  await client.navigate("https://example.com");
  const title = await client.getTitle();
  console.log("Title:", title.title);
  await client.takeScreenshot("example.png");
  await client.closeBrowser();
}

run();
```

Waiting for and interacting with elements

```ts
await client.startBrowser("chrome");
await client.navigate("https://example.com");
await client.waitForElement("css", "form.login", 5000);
await client.sendKeys("css", 'input[name="q"]', "search term");
await client.clickElement("css", 'button[type="submit"]');
```

Notes

- The examples assume you're running in development mode (`pnpm run dev`) which executes TypeScript directly.
- For production, build first (`pnpm run build`) and use the compiled output under `dist/`.
