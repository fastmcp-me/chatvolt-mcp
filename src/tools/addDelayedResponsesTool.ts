import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById, updateAgent } from "../services/chatvolt.js";

export const addDelayedResponsesTool: Tool = {
  name: "add_delayed_responses_tool",
  description: "Adds a new Delayed Responses tool to an existing agent.",
  inputSchema: {
    type: "object",
    properties: {
      agentId: {
        type: "string",
        description: "The ID of the agent to add the tool to.",
      },
      delay: {
        type: "number",
        description: "The delay time in seconds.",
      },
    },
    required: ["agentId", "delay"],
  },
};

export async function handleAddDelayedResponsesTool(request: CallToolRequest) {
  if (request.params.name !== "add_delayed_responses_tool") {
    throw new Error("Unknown tool");
  }

  const { agentId, delay } = request.params.arguments ?? {};

  if (!agentId) {
    throw new Error("'agentId' is a required argument.");
  }

  if (delay === undefined) {
    throw new Error("'delay' is a required argument.");
  }

  // 1. Fetch the agent
  const agent = await getAgentById(String(agentId));

  // 2. Get existing tools
  const existingTools = agent.tools || [];

  // 3. Create the new tool
  const newTool = {
    type: "delayed_responses",
    config: {
      delay: Number(delay),
    },
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