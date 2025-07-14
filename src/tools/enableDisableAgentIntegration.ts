import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { enableDisableAgentIntegration } from "../services/chatvolt.js";

export const enableDisableAgentIntegrationTool: Tool = {
  name: "enable_disable_agent_integration",
  description: `Enable or disable an agent integration

Parameters:
- \`id\` (string, required): ID of the agent to which the service provider belongs.
- \`type\` (string, required): Type of the service provider for which the webhook status will be changed. (values: whatsapp, telegram, zapi, instagram)
- \`enabled\` (boolean, required): Defines the new webhook status. true to enable, false to disable.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the agent to which the service provider belongs.",
      },
      type: {
        type: "string",
        description: "Type of the service provider for which the webhook status will be changed.",
        enum: ["whatsapp", "telegram", "zapi", "instagram"],
      },
      enabled: {
        type: "boolean",
        description: "Defines the new webhook status. true to enable, false to disable.",
      },
    },
    required: ["id", "type", "enabled"],
  },
};

export async function handleEnableDisableAgentIntegration(
  request: CallToolRequest
) {
  if (request.params.name !== "enable_disable_agent_integration") {
    throw new Error("Unknown tool");
  }

  const { id, type, enabled } = request.params.arguments ?? {};

  if (!id || !type || typeof enabled === "undefined") {
    throw new Error("'id', 'type', and 'enabled' are required arguments.");
  }

  const data = await enableDisableAgentIntegration(
    String(id),
    String(type),
    Boolean(enabled)
  );

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}