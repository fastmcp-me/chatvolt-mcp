import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { toolHandlers, tools } from "./tools/index.js";
import { readFile } from "fs/promises";
import { join } from "path";

const resources = [
  {
    uri: "file:///TOOL_DESCRIPTIONS.md",
    name: "Tool Descriptions",
    mimeType: "text/markdown",
  },
  {
    uri: "file:///MODELS.md",
    name: "Model Descriptions",
    mimeType: "text/markdown",
  },
  {
    uri: "file:///CHATVOLT_HTTP_TOOLS.md",
    name: "Chatvolt HTTP Tool Templates",
    mimeType: "text/markdown",
  },
  {
    uri: "file:///CAL_COM_HTTP_TOOLS.md",
    name: "Cal.com HTTP Tool Templates",
    mimeType: "text/markdown",
  },
];

/**
 * Create an MCP server with capabilities for tools.
 */
export const server = new Server(
  {
    name: "chatvolt-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

/**
 * Handler that lists available tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools,
  };
});

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources,
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const resource = resources.find((r) => r.uri === request.params.uri);
  if (!resource) {
    throw new Error("Unknown resource");
  }
  const filePath = join(process.cwd(), resource.uri.replace("file:///", ""));
  const content = await readFile(filePath, "utf-8");
  return {
    content,
  };
});

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "system-prompt",
        description: "Provides the system prompts for the agent.",
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name !== "system-prompt") {
    throw new Error("Unknown prompt");
  }
  const filePath = join(process.cwd(), "SYSTEM_PROMPTS.md");
  const content = await readFile(filePath, "utf-8");
  return {
    messages: [
      {
        role: "user",
        content,
      },
    ],
  };
});

/**
 * Handler for the get_agent tool.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const handler = toolHandlers[request.params.name];
  if (!handler) {
    throw new Error("Unknown tool");
  }
  return handler(request);
});