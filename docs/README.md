# selenium-mcp-server — Documentation

This folder contains user-facing documentation for the selenium-mcp-server project.

Files

- `CLIENT_API.md` — API reference for the client-side exports under `src/selenium-client`.
- `USAGE.md` — Quick start and examples for running the client locally.
- `CONTRIBUTING.md` — How to contribute and run dev tasks.

How to build & run the project

1. Install dependencies (pnpm/npm/yarn). This project expects Node >=18.

2. Development (run TypeScript directly):

```bash
pnpm install
pnpm run dev
```

3. Build and run the compiled app:

```bash
pnpm run build
pnpm start
```

Notes

- This repository is authored in TypeScript and exports a small client library under `src/selenium-client`.
- For a generated API site consider running TypeDoc or similar — see `CLIENT_API.md` for exported symbols to document.
