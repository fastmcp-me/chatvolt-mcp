import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { agentQuery } from "../services/chatvolt.js";

export const agentQueryTool: Tool = {
  name: "agent_query",
  description: `Processes a query (Ask something) through the specified agent.

Parameters:
- \`id\` (string, required): ID of the agent to be queried.
- \`query\` (string, required): Text of the question or command to be sent to the agent.
- \`conversationId\` (string): ID of the existing conversation. If not provided or invalid, a new conversation will be created.
- \`contactId\` (string): ID of an existing contact in the system. If provided, associates the conversation with this contact. Alternative to the contact object.
- \`contact\` (object): Contact details. Used to find an existing contact (by email, phoneNumber, or userId) or create a new one if not found.
- \`visitorId\` (string): ID of the visitor/participant who is sending the query. If not provided, a new ID will be generated.
- \`temperature\` (number): Model temperature (min 0.0, max 1.0). Controls the randomness of the response.
- \`modelName\` (string): Allows overriding the LLM model configured in the agent for this specific query. Use valid model names.
- \`presencePenalty\` (number): Presence penalty (between -2.0 and 2.0). Positive values encourage the model to talk about new topics.
- \`frequencyPenalty\` (number): Frequency penalty (between -2.0 and 2.0). Positive values discourage the model from repeating textual lines.
- \`topP\` (number): Nucleus sampling (alternative to temperature). Considers tokens with accumulated probability mass top_p. (Ex: 0.1 considers the top 10%). It is recommended to change topP or temperature, not both.
- \`filters\` (object): 
- \`systemPrompt\` (string): Allows overriding the system prompt configured in the agent for this specific query.
- \`context\` (object): Object to pass additional context data that can be used by tools or in the prompt.
- \`callbackURL\` (string): Optional URL. If provided, the API will return 202 immediately and will deliver the response to the Agent via a POST request to this URL when it is ready.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the agent to be queried.",
      },
      query: {
        type: "string",
        description: "Text of the question or command to be sent to the agent.",
      },
      conversationId: {
        type: "string",
        description:
          "ID of the existing conversation. If not provided or invalid, a new conversation will be created.",
      },
      contactId: {
        type: "string",
        description:
          "ID of an existing contact in the system. If provided, associates the conversation with this contact. Alternative to the contact object.",
      },
      contact: {
        type: "object",
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          phoneNumber: { type: "string" },
          userId: { type: "string" },
        },
        description:
          "Contact details. Used to find an existing contact (by email, phoneNumber, or userId) or create a new one if not found.",
      },
      visitorId: {
        type: "string",
        description:
          "ID of the visitor/participant who is sending the query. If not provided, a new ID will be generated.",
      },
      temperature: {
        type: "number",
        description:
          "Model temperature (min 0.0, max 1.0). Controls the randomness of the response.",
      },
      modelName: {
        type: "string",
        description:
          "Allows overriding the LLM model configured in the agent for this specific query. Use valid model names.",
      },
      presencePenalty: {
        type: "number",
        description:
          "Presence penalty (between -2.0 and 2.0). Positive values encourage the model to talk about new topics.",
      },
      frequencyPenalty: {
        type: "number",
        description:
          "Frequency penalty (between -2.0 and 2.0). Positive values discourage the model from repeating textual lines.",
      },
      topP: {
        type: "number",
        description:
          "Nucleus sampling (alternative to temperature). Considers tokens with accumulated probability mass top_p. (Ex: 0.1 considers the top 10%). It is recommended to change topP or temperature, not both.",
      },
      filters: {
        type: "object",
        properties: {
          custom_ids: {
            type: "array",
            items: { type: "string" },
          },
          datasource_ids: {
            type: "array",
            items: { type: "string" },
          },
        },
      },
      systemPrompt: {
        type: "string",
        description:
          "Allows overriding the system prompt configured in the agent for this specific query.",
      },
      context: {
        type: "object",
        description:
          "Object to pass additional context data that can be used by tools or in the prompt.",
      },
      callbackURL: {
        type: "string",
        description:
          "Optional URL. If provided, the API will return 202 immediately and will deliver the response to the Agent via a POST request to this URL when it is ready.",
      },
    },
    required: ["id", "query"],
  },
};

export async function handleAgentQuery(request: CallToolRequest) {
  if (request.params.name !== "agent_query") {
    throw new Error("Unknown tool");
  }

  const { id, ...body } = request.params.arguments || {};

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await agentQuery(String(id), body);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}