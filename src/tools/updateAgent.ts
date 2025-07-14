import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { updateAgent } from "../services/chatvolt.js";

export const updateAgentTool: Tool = {
  name: "update_agent",
  description: `Partially updates an existing agent based on the ID. Allows updating one or more fields of a specific agent. Only the fields provided in the request body will be updated.

Parameters:
- \`id\` (string, required): ID of the agent to be updated.
- \`name\` (string): New name for the agent.
- \`description\` (string): New description for the agent.
- \`modelName\` (string): New LLM model to be used by the agent. Check the API for available model names. (values: gpt_41_nano, gpt_41_mini, gpt_41, gpt_4o_mini, gpt_4o_mini_search...)
- \`temperature\` (number): New model temperature (min 0.0, max 1.0).
- \`systemPrompt\` (string): New system prompt for the agent.
- \`visibility\` (string): New visibility for the agent. (values: public, private)
- \`handle\` (string): New unique identifier (slug) for the agent.
- \`interfaceConfig\` (object): New chat interface settings for this agent. Replaces the existing object.
- \`configUrlExternal\` (object): New external URL configurations. Replaces the existing object.
- \`configUrlInfosSystemExternal\` (object): New external URL configurations of the system. Replaces the existing object.
- \`tools\` (array): List of tools for the agent. This array defines the final state of the tools.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the agent to be updated.",
      },
      name: {
        type: "string",
        description: "New name for the agent.",
      },
      description: {
        type: "string",
        description: "New description for the agent.",
      },
      modelName: {
        type: "string",
        description: "New LLM model to be used by the agent. Check the API for available model names.",
        enum: [
          "gpt_41_nano",
          "gpt_41_mini",
          "gpt_41",
          "gpt_4o_mini",
          "gpt_4o_mini_search",
          "gpt_4_o",
          "gpt_4o_search",
          "gpt_o3_mini",
          "gpt_o4_mini",
          "sabia_3",
          "claude_3_haiku",
          "claude_3_sonnet",
          "claude_sonnet",
          "claude_opus",
          "mistral_7b_instruct",
          "mistral_nemo",
          "mistral_small",
          "mistral_medium",
          "mistral_large",
          "gemini_pro",
          "gemini_flash_preview",
          "gemini_flash",
          "gemini_flash_lite",
          "gemma_3_27b",
          "llama_3_8b_instruct",
          "llama_3_70b_instruct",
          "llama_4_scout",
          "llama_4_maverick",
          "command_r",
          "command_a",
          "mythomax_l2_13b",
          "wizardlm_2",
          "phi_4",
          "deepseek_v3",
          "deepseek_r1",
          "qwen_qwq",
          "qwen_72b",
          "qwen_max",
          "qwen_plus",
          "qwen_turbo",
          "qwen_32b",
          "qwen_235b",
          "grok_2",
          "grok_3",
          "grok_3_mini",
        ],
      },
      temperature: {
        type: "number",
        description: "New model temperature (min 0.0, max 1.0).",
      },
      systemPrompt: {
        type: "string",
        description: "New system prompt for the agent.",
      },
      visibility: {
        type: "string",
        enum: ["public", "private"],
        description: "New visibility for the agent.",
      },
      handle: {
        type: "string",
        description: "New unique identifier (slug) for the agent.",
      },
      interfaceConfig: {
        type: "object",
        description: "New chat interface settings for this agent. Replaces the existing object.",
      },
      configUrlExternal: {
        type: "object",
        description: "New external URL configurations. Replaces the existing object.",
      },
      configUrlInfosSystemExternal: {
        type: "object",
        description: "New external URL configurations of the system. Replaces the existing object.",
      },
      tools: {
        type: "array",
        items: {
          type: "object",
        },
        description: "List of tools for the agent. This array defines the final state of the tools.",
      },
    },
    required: ["id"],
  },
};

export async function handleUpdateAgent(
  request: CallToolRequest
) {
  if (request.params.name !== "update_agent") {
    throw new Error("Unknown tool");
  }

  const { id, ...agentData } = request.params.arguments ?? {};

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await updateAgent(String(id), agentData);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}