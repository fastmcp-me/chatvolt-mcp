import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getAgentById, updateAgent } from "../services/chatvolt.js";

export const addDatastoreTool: Tool = {
  name: "addDatastoreTool",
  description: "Adds a new Datastore tool to an existing agent.",
  inputSchema: {
    type: "object",
    properties: {
      agentId: {
        type: "string",
        description: "The ID of the agent to add the tool to.",
      },
      datastoreId: {
        type: "string",
        description: "The ID of the datastore to link.",
      },
    },
    required: ["agentId", "datastoreId"],
  },
};

export async function handleAddDatastoreTool(request: CallToolRequest) {
  if (request.params.name !== "addDatastoreTool") {
    throw new Error("Unknown tool");
  }

  const { agentId, datastoreId } = request.params.arguments ?? {};

  if (!agentId) {
    throw new Error("'agentId' is a required argument.");
  }

  if (!datastoreId) {
    throw new Error("'datastoreId' is a required argument.");
  }

  // 1. Fetch the agent
  const agent = await getAgentById(String(agentId));

  // 2. Get existing tools
  const existingTools = agent.tools || [];

  // 3. Create the new tool
  const newTool = {
    type: "datastore",
    datastoreId: String(datastoreId),
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