#!/usr/bin/env node

import { SeleniumMCPServer } from "./server/server.js";

const server = new SeleniumMCPServer();
server.run().catch(console.error);
