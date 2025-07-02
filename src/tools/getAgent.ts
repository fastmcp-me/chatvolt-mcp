import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById } from "../services/chatvolt.js";

export const getAgentTool: Tool = {
  name: "get_agent",
  description: "Get a Chatvolt agent by its ID or handle",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description:
          "Agent ID or its handle (unique identifier preceded by '@', e.g., '@my-agent')",
      },
    },
    required: ["id"],
  },
};

export async function handleGetAgent(request: CallToolRequest) {
  if (request.params.name !== "get_agent") {
    throw new Error("Unknown tool");
  }

  const id = String(request.params.arguments?.id);
  if (!id) {
    throw new Error("Agent ID is required");
  }

  const data = await getAgentById(id);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}