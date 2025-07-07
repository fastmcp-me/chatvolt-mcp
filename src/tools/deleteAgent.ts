import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { deleteAgent } from "../services/chatvolt.js";

export const deleteAgentTool: Tool = {
  name: "delete_agent",
  description: "Permanently deletes a specific agent by its ID.",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the agent to be deleted.",
      },
    },
    required: ["id"],
  },
};

export async function handleDeleteAgent(request: CallToolRequest) {
  if (request.params.name !== "delete_agent") {
    throw new Error("Unknown tool");
  }

  const id = request.params.arguments?.id;

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await deleteAgent(String(id));

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}