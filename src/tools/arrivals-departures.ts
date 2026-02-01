import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type OnebusawaySDK from "onebusaway-sdk";

const paramsSchema = {
  stopId: z.string().describe("The ID of the stop to get arrivals/departures for"),
  minutesBefore: z.number().optional().describe("Include vehicles that arrived/departed in the previous n minutes"),
  minutesAfter: z.number().optional().describe("Include vehicles arriving/departing in the next n minutes"),
};

export function registerArrivalsDepartures(server: McpServer, client: OnebusawaySDK) {
  server.tool(
    "get_arrivals_departures",
    "Get real-time arrivals and departures for a transit stop",
    paramsSchema,
    async ({ stopId, minutesBefore, minutesAfter }) => {
      const response = await client.arrivalAndDeparture.list(stopId, {
        minutesBefore,
        minutesAfter,
      });

      const arrivalsAndDepartures = response.data.entry.arrivalsAndDepartures.map((ad) => ({
        routeId: ad.routeId,
        routeShortName: ad.routeShortName,
        tripId: ad.tripId,
        tripHeadsign: ad.tripHeadsign,
        stopId: ad.stopId,
        scheduledArrivalTime: ad.scheduledArrivalTime,
        predictedArrivalTime: ad.predictedArrivalTime,
        scheduledDepartureTime: ad.scheduledDepartureTime,
        predictedDepartureTime: ad.predictedDepartureTime,
        predicted: ad.predicted,
        status: ad.status,
        vehicleId: ad.vehicleId,
        distanceFromStop: ad.distanceFromStop,
        numberOfStopsAway: ad.numberOfStopsAway,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ arrivalsAndDepartures }, null, 2),
          },
        ],
      };
    }
  );
}
