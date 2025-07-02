# Chatvolt Get Agent MCP Server

A Model Context Protocol server that wraps the Chatvolt "Get Agent" API.

This is a TypeScript-based MCP server that provides a tool to retrieve information about a Chatvolt agent.

## Features

### Tools
- `get_agent` - Retrieves a Chatvolt agent by its ID or handle.
  - Takes an `id` as a required parameter.
  - The `id` can be the agent's ID or its handle (e.g., `@my-agent`).

## Configuration

This server requires a Chatvolt API key to be set as an environment variable.

```bash
export CHATVOLT_API_KEY="your_api_key_here"
```

## Development

Install dependencies:
```bash
npm install
```

Build the server:
```bash
npm run build
```

For development with auto-rebuild:
```bash
npm run watch
```

## Installation

To use with Claude Desktop, add the server config:

On MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
On Windows: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "chatvolt-mcp": {
      "command": "/path/to/chatvolt-mcp/build/index.js"
    }
  }
}
```

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
