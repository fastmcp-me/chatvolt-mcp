import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { listAgents } from "../services/chatvolt.js";

export const listAgentsTool: Tool = {
  name: "list_agents",
  description: `List all Chatvolt agents`,
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export async function handleListAgents(request: CallToolRequest) {
  if (request.params.name !== "list_agents") {
    throw new Error("Unknown tool");
  }

  const data = await listAgents();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}