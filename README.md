# Chatvolt MCP Server

A Model Context Protocol server that wraps the Chatvolt API, providing tools to manage agents and CRM workflows.

This is a TypeScript-based MCP server that provides tools to interact with Chatvolt agents and CRM scenarios.

## Features

### Agent Tools
- `get_agent`: Retrieves a Chatvolt agent by its ID or handle.
- `create_agent`: Creates a new Chatvolt agent.

### CRM Tools
- `list_crm_scenarios`: Lists all CRM scenarios.
- `create_crm_scenario`: Creates a new CRM scenario.
- `update_crm_scenario`: Updates an existing CRM scenario.
- `delete_crm_scenario`: Deletes a CRM scenario.
- `list_crm_steps`: Lists all steps for a given CRM scenario.
- `create_crm_step`: Creates a new step for a CRM scenario.
- `update_crm_step`: Updates an existing CRM step.
- `delete_crm_step`: Deletes a CRM step.

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
      "command": "node /path/to/chatvolt-mcp/build/index.js"
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
