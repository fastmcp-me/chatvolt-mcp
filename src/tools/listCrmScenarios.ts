import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { listCrmScenarios } from "../services/chatvolt.js";

export const listCrmScenariosTool: Tool = {
  name: "list_crm_scenarios",
  description: "List CRM Scenarios",
  inputSchema: {
    type: "object",
    properties: {
      agentId: {
        type: "string",
        description: "Filter scenarios by a specific Agent ID.",
      },
    },
  },
};

export async function handleListCrmScenarios(request: CallToolRequest) {
  if (request.params.name !== "list_crm_scenarios") {
    throw new Error("Unknown tool");
  }

  const agentId = request.params.arguments?.agentId;

  const data = await listCrmScenarios(agentId ? String(agentId) : undefined);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}