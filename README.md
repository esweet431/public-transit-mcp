# Public Transit MCP Server

An MCP (Model Context Protocol) server that provides real-time public transportation information using the [OneBusAway SDK](https://www.npmjs.com/package/onebusaway-sdk) for the Puget Sound region.

## Features

- **get_nearby_stops** - Find transit stops near a location
- **get_arrivals_departures** - Get real-time arrivals and departures for a stop
- **get_stop_info** - Get details for a specific stop
- **get_route_info** - Get details for a specific route

## Prerequisites

- Node.js 18+
- OneBusAway API key ([request one here](https://www.soundtransit.org/help-contacts/business-information/open-transit-data-otd))

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/esweet431/public-transit-mcp.git
   cd public-transit-mcp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set your OneBusAway API key:

   **Option A: Using a `.env` file (recommended)**
   
   Create a `.env` file in the project root:
   ```
   ONEBUSAWAY_API_KEY=your-api-key-here
   ```

   **Option B: Using environment variables**
   ```bash
   # Windows (PowerShell)
   $env:ONEBUSAWAY_API_KEY = "your-api-key-here"

   # Windows (Command Prompt)
   set ONEBUSAWAY_API_KEY=your-api-key-here

   # macOS/Linux
   export ONEBUSAWAY_API_KEY="your-api-key-here"
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run the server:
   ```bash
   npm start
   ```

## Usage with GitHub Copilot CLI

Add the MCP server configuration using the `/mcp add` command:

```
/mcp add public-transit --command node --args C:/path/to/public-transit-mcp/dist/index.js --env ONEBUSAWAY_API_KEY=your-api-key-here
```

Or use `/mcp add public-transit` and follow the interactive prompts to configure:
- **Command**: `node`
- **Args**: `C:/path/to/public-transit-mcp/dist/index.js`
- **Env**: `ONEBUSAWAY_API_KEY=your-api-key-here`

To manage the server:
- `/mcp show` - View current MCP configuration
- `/mcp edit public-transit` - Edit the server configuration
- `/mcp disable public-transit` - Temporarily disable the server
- `/mcp enable public-transit` - Re-enable the server
- `/mcp delete public-transit` - Remove the server

## Development

```bash
# Run in development mode with hot reload
npm run dev
```

## API Region

This server is configured for the **Puget Sound** region (`api.pugetsound.onebusaway.org`).

## License

ISC
