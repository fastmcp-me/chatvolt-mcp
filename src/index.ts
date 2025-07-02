#!/usr/bin/env node

/**
 * This is an MCP server that acts as a wrapper for the Chatvolt "Get Agent" API.
 * It exposes a single tool, "get_agent", which retrieves information about a specific agent.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

/**
 * Create an MCP server with capabilities for tools.
 */
const server = new Server(
  {
    name: "chatvolt-get-agent-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * Handler that lists available tools.
 * Exposes a single "get_agent" tool.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_agent",
        description: "Get a Chatvolt agent by its ID or handle",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Agent ID or its handle (unique identifier preceded by '@', e.g., '@my-agent')",
            },
          },
          required: ["id"],
        },
      },
    ],
  };
});

/**
 * Handler for the get_agent tool.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "get_agent") {
    throw new Error("Unknown tool");
  }

  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const id = String(request.params.arguments?.id);
  if (!id) {
    throw new Error("Agent ID is required");
  }

  const response = await fetch(`https://api.chatvolt.ai/agents/${id}`, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
