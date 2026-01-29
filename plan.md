# OneBusAway MCP Server Implementation Plan

## Problem Statement
Create an MCP (Model Context Protocol) server that provides real-time public transportation information using the OneBusAway REST API for the Puget Sound region.

## Proposed Approach
Build a TypeScript/Node.js MCP server using the official MCP SDK that exposes core real-time transit features as MCP tools. The API key will be configured via environment variable to keep it out of source control.

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
- [ ] Initialize Node.js project with TypeScript
- [ ] Install dependencies (MCP SDK, TypeScript, etc.)
- [ ] Set up TypeScript configuration
- [ ] Create project structure (src/, types/, etc.)
- [ ] Add .gitignore (node_modules, .env, dist/, etc.)
- [ ] Create README with setup instructions

### Phase 2: Core Infrastructure
- [ ] Create OneBusAway API client class
- [ ] Implement API key configuration from environment variable
- [ ] Add base URL configuration for Puget Sound region
- [ ] Create TypeScript types for API responses
- [ ] Implement error handling for API calls

### Phase 3: MCP Server Implementation
- [ ] Set up MCP server boilerplate
- [ ] Implement `get_nearby_stops` tool
- [ ] Implement `get_arrivals_departures` tool
- [ ] Implement `get_stop_info` tool
- [ ] Implement `get_route_info` tool

### Phase 4: Testing & Documentation
- [ ] Add npm scripts (build, start, dev)
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
│   ├── client.ts         # OneBusAway API client
│   ├── tools/            # MCP tool implementations
│   │   ├── nearby-stops.ts
│   │   ├── arrivals-departures.ts
│   │   ├── stop-info.ts
│   │   └── route-info.ts
│   └── types/            # TypeScript type definitions
│       └── onebusaway.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```
