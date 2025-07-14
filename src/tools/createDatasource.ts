import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { createDatasource } from "../services/chatvolt.js";

export const createDatasourceTool: Tool = {
  name: "create_datasource",
  description: `Create a new Chatvolt datasource

Parameters:
- \`datastoreId\` (string, required): The ID of the datastore to add the datasource to.
- \`name\` (string, required): The name for the datasource, used as the filename.
- \`text\` (string, required): The text content for the datasource.`,
  inputSchema: {
    type: "object",
    properties: {
      datastoreId: {
        type: "string",
        description: "The ID of the datastore to add the datasource to.",
      },
      name: {
        type: "string",
        description: "The name for the datasource, used as the filename.",
      },
      text: {
        type: "string",
        description: "The text content for the datasource.",
      },
    },
    required: ["datastoreId", "name", "text"],
  },
};

export async function handleCreateDatasource(request: CallToolRequest) {
  if (request.params.name !== "create_datasource") {
    throw new Error("Unknown tool");
  }

  const { datastoreId, name, text } =
    request.params.arguments || {};

  if (!datastoreId || !name || !text) {
    throw new Error("'datastoreId', 'name' and 'text' are required arguments.");
  }

  const datasourceData = {
    datastoreId: String(datastoreId),
    name: String(name),
    type: "file",
    config: {
      text: String(text),
    },
  };

  const data = await createDatasource(datasourceData);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}