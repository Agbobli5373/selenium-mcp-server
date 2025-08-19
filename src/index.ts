#!/usr/bin/env node

import { OptimizedSeleniumMCPServer } from "./server/optimized-server.js";

const server = new OptimizedSeleniumMCPServer();
server.run().catch(console.error);
