# Chatvolt MCP Server

A Model Context Protocol server that wraps the Chatvolt API, providing tools to manage agents, datastores, and CRM workflows.

This is a TypeScript-based MCP server that provides tools to interact with Chatvolt.

## Installation

You can install and run this server using `npx`:

```bash
npx chatvolt-mcp
```

To use with Roo, add the following to your `.roo/mcp.json` file:

```json
{
  "mcpServers": {
    "chatvolt-mcp": {
      "command": "npx",
      "args": [
        "chatvolt-mcp"
      ],
      "env": {
        "CHATVOLT_API_KEY": "{YOUR_TOKEN}"
      },
      "disabled": false,
      "alwaysAllow": [
        "get_agent"
      ]
    }
  }
}
```

## Features

### Agent Tools
- `create_agent`: Creates a new Chatvolt agent.
- `delete_agent`: Deletes a Chatvolt agent.
- `enable_disable_agent_integration`: Enables or disables an agent integration.
- `get_agent`: Retrieves a Chatvolt agent by its ID or handle.
- `list_agents`: Lists all Chatvolt agents.
- `query_agent`: Sends a query to a Chatvolt agent.
- `update_agent`: Updates an existing Chatvolt agent.

### CRM Tools
- `create_crm_scenario`: Creates a new CRM scenario.
- `create_crm_step`: Creates a new step for a CRM scenario.
- `delete_crm_scenario`: Deletes a CRM scenario.
- `delete_crm_step`: Deletes a CRM step.
- `list_crm_scenarios`: Lists all CRM scenarios.
- `list_crm_steps`: Lists all steps for a given CRM scenario.
- `update_crm_scenario`: Updates an existing CRM scenario.
- `update_crm_step`: Updates an existing CRM step.

### Datastore Tools
- `create_datastore`: Creates a new datastore.
- `create_datasource`: Creates a new datasource.
- `get_datastore`: Retrieves a datastore.
- `list_datastores`: Lists all datastores.

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

### Debugging

Since MCP servers communicate over stdio, debugging can be challenging. We recommend using the [MCP Inspector](https://github.com/modelcontextprotocol/inspector), which is available as a package script:

```bash
npm run inspector
```

The Inspector will provide a URL to access debugging tools in your browser.
