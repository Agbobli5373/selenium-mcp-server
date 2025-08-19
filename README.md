# Selenium MCP Server

A Model Context Protocol (MCP) server that provides seamless integration between MCP clients and Selenium WebDriver. This server enables natural language interactions with web browsers for automated testing, web scraping, and page analysis.

## Features

- Natural Language Interface: control browsers using conversational commands
- Complete Browser Automation: 48 tools covering essential Selenium operations
- Multi-Browser Support: Chrome, Firefox, and Microsoft Edge
- AI‑Optimized Discovery: specialized tools for page analysis and test generation
- Flexible Tool Control: limit available tools using environment variables
- TypeScript Implementation: full type safety and better error handling

## Prerequisites

- Node.js 18.0.0 or higher
- TypeScript 5.0.0 or higher
- Browser drivers for target browser(s):
  - Chrome: ChromeDriver (usually auto-managed by selenium-webdriver)
  - Firefox: GeckoDriver
- Edge: EdgeDriver

## Driver setup

Driver installation and configuration guidance for each supported browser:

- Chrome (ChromeDriver)
  - Recommended: allow `selenium-webdriver` to manage ChromeDriver automatically.
  - Manual install (local project): 
```bash
# bash
npm install --save-dev chromedriver
```
  - On Windows (cmd.exe) you can add the driver to PATH before starting the wrapper:
```bash
# cmd.exe
set PATH=%PATH%;C:\path\to\chromedriver && node wrapper.cjs
```
  - Or provide the driver path when creating the WebDriver instance in code.

- Firefox (GeckoDriver)
  - Download from Mozilla GeckoDriver releases or install via npm:
```bash
# bash
npm install --save-dev geckodriver
```
  - Add the geckodriver binary to PATH or pass its location to your WebDriver builder.

- Edge (msedgedriver)
  - Download from Microsoft Edge WebDriver releases or use an npm package if available.
  - Add the msedgedriver binary to PATH or pass its location when initializing the driver.

Notes:
- Ensure the driver version matches the installed browser major version.
- For CI environments, install the matching driver binary in the build image or use a tool that manages drivers automatically.

## Usage examples

1) Start the wrapper directly (for local testing)
```bash
# bash
node wrapper.cjs
# You should see: Selenium MCP Server running on stdio
```

2) Start wrapper with a limited tool set (Linux/macOS)
```bash
# bash
export MCP_TOOLS='["start_browser","navigate","click_element","send_keys"]'
node wrapper.cjs
```

3) Start wrapper with a limited tool set (Windows cmd.exe)
```bash
# cmd.exe
set MCP_TOOLS=["start_browser","navigate","click_element","send_keys"] && node wrapper.cjs
```

4) Example MCP client server config (Windows)
```json
{
  "servers": {
    "selenium": {
      "command": "node",
      "args": ["C:\\absolute\\path\\to\\selenium-mcp-server\\wrapper.cjs"]
    }
  }
}
```

5) Example: launching a browser via an MCP client
- Configure your MCP client to connect to the `wrapper.cjs` process (see config above).
- Use the `start_browser` tool from the client to open Chrome/Firefox/Edge, then `navigate` to a URL and `get_page_source` or other tools to inspect the page.

## MCP client usage snippets

Below are concise, copy-ready examples showing typical tool calls and a short pseudo-code flow for an MCP-capable client.

Tool call examples (JSON payloads — adapt to your MCP client library):

Start a browser
```json
{
  "tool": "start_browser",
  "args": {
    "browser": "chrome",
    "options": { "headless": false, "arguments": ["--no-sandbox"] }
  }
}
```

Navigate to a page
```json
{
  "tool": "navigate",
  "args": { "url": "https://example.com" }
}
```

Get page source
```json
{
  "tool": "get_page_source",
  "args": {}
}
```

Click an element (example CSS selector)
```json
{
  "tool": "click_element",
  "args": { "by": "css", "value": "button#submit" }
}
```

Send keys to an input
```json
{
  "tool": "send_keys",
  "args": { "by": "css", "value": "input[name=email]", "text": "user@example.com" }
}
```

Close browser
```json
{
  "tool": "close_browser",
  "args": {}
}
```

Example sequence (pseudo-code)
```javascript
// JavaScript (pseudo-code; adapt to your MCP client library)
await mcpClient.callTool('start_browser', { browser: 'chrome', options: { headless: true } });
await mcpClient.callTool('navigate', { url: 'https://example.com' });
const pageHtml = await mcpClient.callTool('get_page_source', {});
await mcpClient.callTool('click_element', { by: 'css', value: 'button#agree' });
await mcpClient.callTool('send_keys', { by: 'css', value: 'input#email', text: 'foo@bar.com' });
await mcpClient.callTool('close_browser', {});
```

Notes
- Tool availability may be limited by the `MCP_TOOLS` environment variable in your MCP client config.
- All examples are protocol-agnostic JSON payloads; adapt them to your chosen MCP client library's API.
- Handle errors and timeouts from the server when automating long-running flows.

## Installation

1. Clone the project
```bash
git clone https://github.com/agbobli5373/selenium-mcp-server.git
cd selenium-mcp-server
```

2. Install dependencies
```bash
npm install
```

3. Build the project
```bash
npm run build
```

4. Test the server (optional)
```bash
node dist/index.js
```
You should see: `Selenium MCP Server running on stdio`

## Configuration

### MCP Client Configuration

Windows:
```json
{
  "servers": {
    "selenium": {
      "command": "node",
      "args": ["C:\\path\\to\\your\\selenium-mcp-server\\wrapper.cjs"]
    }
  }
}
```

macOS / Linux:
```json
{
  "servers": {
    "selenium": {
      "command": "node",
      "args": ["/path/to/your/selenium-mcp-server/wrapper.cjs"]
    }
  }
}
```

Replace the paths with the absolute path to `wrapper.cjs` for your environment.

### Environment Variables

Control available tools with `MCP_TOOLS`:

- No `MCP_TOOLS` set (or no `env` section): all 48 tools are available by default
- `MCP_TOOLS` with specific tools: only those tools become available

Example — default (all tools available):
```json
{
  "servers": {
    "selenium": {
      "command": "node",
      "args": ["/path/to/selenium-mcp-server/wrapper.cjs"]
    }
  }
}
```

Example — limit to specific tools:
```json
{
  "servers": {
    "selenium": {
      "command": "node",
      "args": ["/path/to/selenium-mcp-server/wrapper.cjs"],
      "env": {
        "MCP_TOOLS": ["start_browser", "navigate", "click_element", "send_keys"]
      }
    }
  }
}
```

## Troubleshooting

Common issues and fixes:

- Server won't start:
  - Verify Node.js v18+ is installed
  - Run `npm run build` and check for build errors
- Connection issues:
  - Confirm absolute paths in MCP client configuration
- Browser driver issues:
  - Ensure correct WebDriver is installed and browser versions are compatible

## Development notes

- Source TypeScript entrypoints are in `src/` (server and tool implementations).
- Wrapper scripts: `wrapper.cjs` / `wrapper.js` — used by MCP clients to start the server.
- Tools are organized under `src/tools/` and client logic under `src/selenium-client/`.

## License

MIT License
