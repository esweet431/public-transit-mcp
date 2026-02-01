import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type OnebusawaySDK from "onebusaway-sdk";

const paramsSchema = {
  lat: z.number().describe("Latitude of the location to search near"),
  lon: z.number().describe("Longitude of the location to search near"),
  radius: z.number().optional().describe("Search radius in meters (default: 500)"),
  query: z.string().optional().describe("Optional search query to filter stops by name"),
};

export function registerNearbyStops(server: McpServer, client: OnebusawaySDK) {
  server.tool(
    "get_nearby_stops",
    "Find transit stops near a geographic location",
    paramsSchema,
    async ({ lat, lon, radius, query }) => {
      const response = await client.stopsForLocation.list({
        lat,
        lon,
        radius,
        query,
      });

      const stops = response.data.list.map((stop) => ({
        id: stop.id,
        name: stop.name,
        code: stop.code,
        lat: stop.lat,
        lon: stop.lon,
        direction: stop.direction,
        routeIds: stop.routeIds,
        wheelchairBoarding: stop.wheelchairBoarding,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                stops,
                limitExceeded: response.data.limitExceeded,
                outOfRange: response.data.outOfRange,
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
