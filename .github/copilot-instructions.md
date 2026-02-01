# Copilot Instructions for Public Transit MCP

## Build & Development Commands

```bash
npm run build    # Compile TypeScript to dist/
npm run dev      # Development mode with hot reload
npm start        # Run the compiled server
```

## Architecture

This is an MCP (Model Context Protocol) server that wraps the OneBusAway SDK to provide public transit information for the Puget Sound region.

### Structure

- `src/index.ts` - Server entry point: creates MCP server, registers tools, starts stdio transport
- `src/client.ts` - OneBusAway SDK client factory (requires `ONEBUSAWAY_API_KEY` env var)
- `src/tools/` - Each file exports a `register*` function that adds one MCP tool to the server

### Tool Registration Pattern

Each tool follows this pattern:

```typescript
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type OnebusawaySDK from "onebusaway-sdk";

const paramsSchema = {
  paramName: z.string().describe("Description for the AI"),
};

export function registerToolName(server: McpServer, client: OnebusawaySDK) {
  server.tool(
    "tool_name",
    "Tool description",
    paramsSchema,
    async (params) => {
      // Call OneBusAway SDK
      // Return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] }
    }
  );
}
```

## Key Conventions

- Use Zod schemas with `.describe()` for tool parameters - these descriptions are shown to AI assistants
- Tool handlers return JSON-stringified results in the MCP content format
- All OneBusAway SDK calls go through the shared client from `client.ts`
- Use `type: "text" as const` for content type to satisfy TypeScript

## Environment

Requires `ONEBUSAWAY_API_KEY` environment variable. Use `.env` file for local development.
