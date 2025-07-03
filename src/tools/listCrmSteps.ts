import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { listCrmSteps } from "../services/chatvolt.js";

export const listCrmStepsTool: Tool = {
  name: "list_crm_steps",
  description: "List CRM Steps for a given scenario",
  inputSchema: {
    type: "object",
    properties: {
      scenarioId: {
        type: "string",
        description: "The ID of the CRM scenario to list steps for.",
      },
    },
    required: ["scenarioId"],
  },
};

export async function handleListCrmSteps(request: CallToolRequest) {
  if (request.params.name !== "list_crm_steps") {
    throw new Error("Unknown tool");
  }

  const { scenarioId } = request.params.arguments || {};

  if (!scenarioId) {
    throw new Error("'scenarioId' is a required argument.");
  }

  const data = await listCrmSteps(String(scenarioId));

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}