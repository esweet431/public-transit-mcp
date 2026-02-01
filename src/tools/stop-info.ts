import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type OnebusawaySDK from "onebusaway-sdk";

const paramsSchema = {
  stopId: z.string().describe("The ID of the stop to get details for"),
};

export function registerStopInfo(server: McpServer, client: OnebusawaySDK) {
  server.tool(
    "get_stop_info",
    "Get details for a specific transit stop",
    paramsSchema,
    async ({ stopId }) => {
      const response = await client.stop.retrieve(stopId);

      const stop = response.data.entry;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                id: stop.id,
                name: stop.name,
                code: stop.code,
                lat: stop.lat,
                lon: stop.lon,
                direction: stop.direction,
                locationType: stop.locationType,
                routeIds: stop.routeIds,
                wheelchairBoarding: stop.wheelchairBoarding,
                parent: stop.parent,
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
