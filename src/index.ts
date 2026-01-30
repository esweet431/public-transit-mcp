import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createClient } from "./client.js";

// Create OneBusAway client (validates API key on startup)
const obaClient = createClient();

// Create MCP server
const server = new McpServer({
  name: "public-transit-mcp",
  version: "1.0.0",
});

// TODO: Register tools
// - get_nearby_stops
// - get_arrivals_departures
// - get_stop_info
// - get_route_info

// Start the server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Public Transit MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
