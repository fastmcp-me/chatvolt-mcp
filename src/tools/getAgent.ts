import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById } from "../services/chatvolt.js";

export const getAgentTool: Tool = {
  name: "get_agent",
  description: `Get a Chatvolt agent by its ID or handle

Parameters:
- \`id\` (string, required): Agent ID or its handle (unique identifier preceded by '@', e.g., '@my-agent')`,
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

  const id = request.params.arguments?.id;

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await getAgentById(String(id));

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}