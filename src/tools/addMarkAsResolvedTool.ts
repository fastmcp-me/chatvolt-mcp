import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById, updateAgent } from "../services/chatvolt.js";

export const addMarkAsResolvedTool: Tool = {
  name: "addMarkAsResolvedTool",
  description: "Adds a new Mark As Resolved tool to an existing agent.",
  inputSchema: {
    type: "object",
    properties: {
      agentId: {
        type: "string",
        description: "The ID of the agent to add the tool to.",
      },
    },
    required: ["agentId"],
  },
};

export async function handleAddMarkAsResolvedTool(request: CallToolRequest) {
  if (request.params.name !== "addMarkAsResolvedTool") {
    throw new Error("Unknown tool");
  }

  const { agentId } = request.params.arguments ?? {};

  if (!agentId) {
    throw new Error("'agentId' is a required argument.");
  }

  const agent = await getAgentById(String(agentId));

  const existingTools = agent.tools || [];

  const newTool = {
    type: "mark_as_resolved",
  };

  const updatedTools = [...existingTools, newTool];

  const updatedAgent = await updateAgent(String(agentId), {
    tools: updatedTools,
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(updatedAgent, null, 2),
      },
    ],
  };
}