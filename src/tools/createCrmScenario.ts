import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { createCrmScenario } from "../services/chatvolt.js";

export const createCrmScenarioTool: Tool = {
  name: "create_crm_scenario",
  description: `Create a new CRM Scenario

Parameters:
- \`name\` (string, required): The name for the new CRM scenario.
- \`description\` (string): An optional description for the CRM scenario.`,
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name for the new CRM scenario.",
      },
      description: {
        type: "string",
        description: "An optional description for the CRM scenario.",
      },
    },
    required: ["name"],
  },
};

export async function handleCreateCrmScenario(request: CallToolRequest) {
  if (request.params.name !== "create_crm_scenario") {
    throw new Error("Unknown tool");
  }

  const { name, description } = request.params.arguments || {};

  if (!name) {
    throw new Error("'name' is a required argument.");
  }

  const data = await createCrmScenario({
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