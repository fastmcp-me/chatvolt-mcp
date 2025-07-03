import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { createAgent } from "../services/chatvolt.js";

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
        description: "The system prompt for the agent.",
      },
    },
    required: ["name", "modelName", "description", "systemPrompt"],
  },
};

export async function handleCreateAgent(request: CallToolRequest) {
  if (request.params.name !== "create_agent") {
    throw new Error("Unknown tool");
  }

  const { name, description, modelName, systemPrompt } =
    request.params.arguments || {};

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