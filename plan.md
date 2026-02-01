# OneBusAway MCP Server Implementation Plan

## Problem Statement
Create an MCP (Model Context Protocol) server that provides real-time public transportation information using the OneBusAway REST API for the Puget Sound region.

## Proposed Approach
Build a TypeScript/Node.js MCP server using the official MCP SDK and [OneBusAway SDK](https://www.npmjs.com/package/onebusaway-sdk) that exposes core real-time transit features as MCP tools. The API key will be configured via environment variable to keep it out of source control.

## Configuration
- **Language**: TypeScript/Node.js
- **API Region**: Puget Sound (`api.pugetsound.onebusaway.org`)
- **API Key Storage**: Environment variable (`ONEBUSAWAY_API_KEY`)
- **Scope**: Core real-time features (Phase 1), expandable later

## MCP Tools (Phase 1 - Core Features)

| Tool Name | Description | OneBusAway Endpoint |
|-----------|-------------|---------------------|
| `get_nearby_stops` | Find transit stops near a location | `/stops-for-location` |
| `get_arrivals_departures` | Get real-time arrivals/departures for a stop | `/arrivals-and-departures-for-stop` |
| `get_stop_info` | Get details for a specific stop | `/stop` |
| `get_route_info` | Get details for a specific route | `/route` |

## Future Expansion (Phase 2+)
- `get_trip_details` - Extended trip details with real-time vehicle tracking
- `get_agencies` - List supported agencies
- `get_routes_for_location` - Search routes near a location
- `get_schedule_for_stop` - Full schedule for a stop
- `get_vehicles_for_agency` - Active vehicles tracking
- `get_service_alerts` - Service alerts/situations

---

## Workplan

### Phase 1: Project Setup
- [x] Initialize Node.js project with TypeScript
- [x] Install dependencies (MCP SDK, TypeScript, etc.)
- [x] Set up TypeScript configuration
- [x] Create project structure (src/, types/, etc.)
- [x] Add .gitignore (node_modules, .env, dist/, etc.)
- [x] Add npm scripts (build, start, dev)
- [x] Create README with setup instructions

### Phase 2: Core Infrastructure
- [x] Install OneBusAway SDK (`onebusaway-sdk`)
- [x] Create client wrapper with API key from environment variable
- [x] Configure base URL for Puget Sound region
- [x] TypeScript types provided by SDK
- [x] Error handling provided by SDK

### Phase 3: MCP Server Implementation
- [x] Set up MCP server boilerplate
- [x] Implement `get_nearby_stops` tool
- [x] Implement `get_arrivals_departures` tool
- [x] Implement `get_stop_info` tool
- [x] Implement `get_route_info` tool

### Phase 4: Testing & Documentation
- [ ] Test MCP server with Claude Desktop or MCP Inspector
- [ ] Document environment variable setup
- [ ] Add example usage in README

---

## Notes & Considerations

### API Details
- Base URL: `https://api.pugetsound.onebusaway.org/api/where`
- All requests require `key` parameter
- Responses available in JSON format (use `.json` extension)
- Timestamps are milliseconds since Unix epoch

### Security
- API key stored in `ONEBUSAWAY_API_KEY` environment variable
- `.env` file should be in `.gitignore`
- README will document setup without exposing keys

### Project Structure
```
public-transit-mcp/
├── src/
│   ├── index.ts          # MCP server entry point
│   ├── client.ts         # OneBusAway SDK wrapper
│   └── tools/            # MCP tool implementations
│       ├── nearby-stops.ts
│       ├── arrivals-departures.ts
│       ├── stop-info.ts
│       └── route-info.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```
