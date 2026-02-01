import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type OnebusawaySDK from "onebusaway-sdk";

const paramsSchema = {
  routeId: z.string().describe("The ID of the route to get details for"),
};

export function registerRouteInfo(server: McpServer, client: OnebusawaySDK) {
  server.tool(
    "get_route_info",
    "Get details for a specific transit route",
    paramsSchema,
    async ({ routeId }) => {
      const response = await client.route.retrieve(routeId);

      const route = response.data.entry;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: route.id,
                shortName: route.shortName,
                longName: route.longName,
                description: route.description,
                type: route.type,
                agencyId: route.agencyId,
                url: route.url,
                color: route.color,
                textColor: route.textColor,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
