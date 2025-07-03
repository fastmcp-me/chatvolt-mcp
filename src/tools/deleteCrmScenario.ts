import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { deleteCrmScenario } from "../services/chatvolt.js";

export const deleteCrmScenarioTool: Tool = {
  name: "delete_crm_scenario",
  description: "Delete a CRM Scenario",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the CRM scenario to delete.",
      },
    },
    required: ["id"],
  },
};

export async function handleDeleteCrmScenario(request: CallToolRequest) {
  if (request.params.name !== "delete_crm_scenario") {
    throw new Error("Unknown tool");
  }

  const { id } = request.params.arguments || {};

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await deleteCrmScenario(String(id));

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}