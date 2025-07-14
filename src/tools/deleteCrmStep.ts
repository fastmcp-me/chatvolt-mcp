import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { deleteCrmStep } from "../services/chatvolt.js";

export const deleteCrmStepTool: Tool = {
  name: "delete_crm_step",
  description: `Delete a CRM Step

Parameters:
- \`id\` (string, required): The ID of the CRM step to delete.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the CRM step to delete.",
      },
    },
    required: ["id"],
  },
};

export async function handleDeleteCrmStep(request: CallToolRequest) {
  if (request.params.name !== "delete_crm_step") {
    throw new Error("Unknown tool");
  }

  const { id } = request.params.arguments || {};

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await deleteCrmStep(String(id));

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}