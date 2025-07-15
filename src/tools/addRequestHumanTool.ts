import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById, updateAgent } from "../services/chatvolt.js";

export const addRequestHumanTool: Tool = {
  name: "addRequestHumanTool",
  description: "Adds a new Request Human tool to an existing agent.",
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

export async function handleAddRequestHumanTool(request: CallToolRequest) {
  if (request.params.name !== "addRequestHumanTool") {
    throw new Error("Unknown tool");
  }

  const { agentId } = request.params.arguments ?? {};

  if (!agentId) {
    throw new Error("'agentId' is a required argument.");
  }

  // 1. Fetch the agent
  const agent = await getAgentById(String(agentId));

  // 2. Get existing tools
  const existingTools = agent.tools || [];

  // 3. Create the new tool
  const newTool = {
    type: "request_human",
  };

  // 4. Create the updated tools list
  const updatedTools = [...existingTools, newTool];

  // 5. Update the agent
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