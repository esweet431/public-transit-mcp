import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createClient } from "./client.js";
import { registerNearbyStops } from "./tools/nearby-stops.js";

// create OneBusAway client
const obaClient = createClient();

// create MCP server
const server = new McpServer({
  name: "public-transit-mcp",
  version: "1.0.0",
});

// Register tools
registerNearbyStops(server, obaClient);
// TODO:
// - get_arrivals_departures
// - get_stop_info
// - get_route_info

// start the server with stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Public Transit MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
