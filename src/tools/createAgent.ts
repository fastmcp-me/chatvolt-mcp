import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { createAgent } from "../services/chatvolt.js";

export const createAgentTool: Tool = {
  name: "create_agent",
  description: "Create a new Chatvolt agent",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the agent.",
      },
      description: {
        type: "string",
        description: "A description for the agent.",
      },
      modelName: {
        type: "string",
        description: "The model name for the agent (e.g., 'gpt-4').",
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
      systemPrompt: {
        type: "string",
        description: "The system prompt for the agent.",
      },
      temperature: {
        type: "number",
        description:
          "Model temperature (min 0.0, max 1.0). Controls randomness. Model default if not specified.",
      },
      tools: {
        type: "array",
        items: {
          type: "object",
        },
        description: "Lista de ferramentas a serem associadas ao agente.",
      },
    },
    required: ["name", "modelName", "description", "systemPrompt"],
  },
};

export async function handleCreateAgent(request: CallToolRequest) {
  if (request.params.name !== "create_agent") {
    throw new Error("Unknown tool");
  }

  const { name, description, modelName, systemPrompt, temperature, tools } =
    request.params.arguments || {};

  if (!name || !modelName) {
    throw new Error("'name' and 'modelName' are required arguments.");
  }

  const agentData = {
    name: String(name),
    description: description ? String(description) : undefined,
    modelName: String(modelName),
    systemPrompt: systemPrompt ? String(systemPrompt) : undefined,
    temperature: temperature ? Number(temperature) : undefined,
    tools: tools as any[] | undefined,
  };

  const data = await createAgent(agentData);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}