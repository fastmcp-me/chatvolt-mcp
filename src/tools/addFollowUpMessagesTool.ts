import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById, updateAgent } from "../services/chatvolt.js";

export const addFollowUpMessagesTool: Tool = {
  name: "add_follow_up_messages_tool",
  description: "Adds a new Follow Up Messages tool to an existing agent.",
  inputSchema: {
    type: "object",
    properties: {
      agentId: {
        type: "string",
        description: "The ID of the agent to add the tool to.",
      },
      config: {
        type: "object",
        description: "The configuration for the follow-up messages tool.",
        properties: {
          messages: {
            type: "string",
            description: "The follow-up message text.",
          },
          max_sends: {
            type: "number",
            description: "The maximum number of times the message can be sent.",
          },
          interval_hours: {
            type: "number",
            description: "The interval in hours between sends.",
          },
        },
        required: ["messages", "max_sends", "interval_hours"],
      },
    },
    required: ["agentId", "config"],
  },
};

export async function handleAddFollowUpMessagesTool(
  request: CallToolRequest
) {
  if (request.params.name !== "add_follow_up_messages_tool") {
    throw new Error("Unknown tool");
  }

  const { agentId, config } = request.params.arguments ?? {};

  if (!agentId) {
    throw new Error("'agentId' is a required argument.");
  }

  if (!config) {
    throw new Error("'config' is a required argument.");
  }

  const agent = await getAgentById(String(agentId));
  const existingTools = agent.tools || [];
  const newTool = {
    type: "follow_up_messages",
    config,
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