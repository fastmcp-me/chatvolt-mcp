import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { updateCrmScenario } from "../services/chatvolt.js";

export const updateCrmScenarioTool: Tool = {
  name: "update_crm_scenario",
  description: `Update a CRM Scenario

Parameters:
- \`id\` (string, required): The ID of the CRM scenario to update.
- \`name\` (string, required): The new name for the CRM scenario.
- \`description\` (string): An optional new description for the CRM scenario.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the CRM scenario to update.",
      },
      name: {
        type: "string",
        description: "The new name for the CRM scenario.",
      },
      description: {
        type: "string",
        description: "An optional new description for the CRM scenario.",
      },
    },
    required: ["id", "name"],
  },
};

export async function handleUpdateCrmScenario(request: CallToolRequest) {
  if (request.params.name !== "update_crm_scenario") {
    throw new Error("Unknown tool");
  }

  const { id, name, description } = request.params.arguments || {};

  if (!id || !name) {
    throw new Error("'id' and 'name' are required arguments.");
  }

  const data = await updateCrmScenario({
    id: String(id),
    name: String(name),
    description: description ? String(description) : undefined,
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}