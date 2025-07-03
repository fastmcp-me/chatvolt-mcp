# Technical Specification: `createAgent` Tool

## 1. Overview

This document outlines the technical specification for a new tool named `createAgent`. This tool will allow users to create a new agent in Chatvolt by interacting with the `POST /agents` API endpoint. It will be integrated into the existing tool framework, following the established patterns for tool definition, handling, and service interaction.

## 2. Tool Definition (`src/tools/createAgent.ts`)

The `createAgent` tool will be defined in a new file, [`src/tools/createAgent.ts`](src/tools/createAgent.ts).

### 2.1. Tool Object (`createAgentTool`)

The tool will be exposed through a `Tool` object with the following structure:

```typescript
import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const createAgentTool: Tool = {
  name: "create_agent",
  description: "Create a new Chatvolt agent",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the agent.",
      },
      description: {
        type: "string",
        description: "A description for the agent.",
      },
      modelName: {
        type: "string",
        description: "The model name for the agent (e.g., 'gpt-4').",
      },
      systemPrompt: {
        type: "string",
        description: "The system message for the agent.",
      },
    },
    required: ["name", "modelName"],
  },
};
```

### 2.2. Tool Handler (`handleCreateAgent`)

A handler function will process requests for this tool. It will validate the input, call the Chatvolt service, and format the response.

```typescript
import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { createAgent } from "../services/chatvolt.js";

export async function handleCreateAgent(request: CallToolRequest) {
  if (request.params.name !== "create_agent") {
    throw new Error("Unknown tool");
  }

  const { name, description, modelName, systemPrompt } = request.params.arguments || {};

  if (!name || !modelName) {
    throw new Error("'name' and 'modelName' are required arguments.");
  }

  const agentData = {
    name: String(name),
    description: description ? String(description) : undefined,
    modelName: String(modelName),
    systemPrompt: systemPrompt ? String(systemPrompt) : undefined,
  };

  const data = await createAgent(agentData);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}
```

## 3. Service Layer (`src/services/chatvolt.ts`)

A new function, `createAgent`, will be added to [`src/services/chatvolt.ts`](src/services/chatvolt.ts) to handle the API interaction.

### 3.1. `createAgent` Function

This function will send a `POST` request to the `/agents` endpoint.

```typescript
// Existing content in src/services/chatvolt.ts...

/**
 * Creates a new agent in Chatvolt.
 * @param agentData - The data for the new agent.
 * @returns The created agent data.
 * @throws An error if the API key is not set or if the request fails.
 */
export async function createAgent(agentData: {
  name: string;
  description?: string;
  modelName: string;
  systemPrompt?: string;
}) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/agents`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}
```

## 4. Tool Integration (`src/tools/index.ts`)

The new `createAgent` tool will be registered in [`src/tools/index.ts`](src/tools/index.ts).

### 4.1. Modifications to `src/tools/index.ts`

The file will be updated to import and export the new tool and its handler.

```typescript
import { getAgentTool, handleGetAgent } from "./getAgent.js";
import { createAgentTool, handleCreateAgent } from "./createAgent.js";

export const tools = [getAgentTool, createAgentTool];
export const toolHandlers = {
  [getAgentTool.name]: handleGetAgent,
  [createAgentTool.name]: handleCreateAgent,
};
```

This completes the technical specification for the `createAgent` tool.