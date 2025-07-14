import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { getDatastoreById } from "../services/chatvolt.js";

export const getDatastoreTool: Tool = {
  name: "get_datastore",
  description: `Get a Chatvolt datastore by its ID

Parameters:
- \`id\` (string, required): ID of the datastore to be retrieved.
- \`search\` (string): Term to search for datasources by name (case-insensitive). Optional.
- \`status\` (string): Filtra datasources pelo status. Opcional. (values: unsynched, pending, running, synched, error...)
- \`type\` (string): Filtra datasources pelo tipo. Opcional. (values: file, web_page, web_site, qa)
- \`offset\` (integer): Número de páginas a pular para paginação das datasources. Opcional.
- \`limit\` (integer): Número máximo de datasources a serem retornadas por página. Opcional.
- \`groupId\` (string): Filtra datasources por um ID de grupo específico. Opcional.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the datastore to be retrieved.",
      },
      search: {
        type: "string",
        description: "Term to search for datasources by name (case-insensitive). Optional.",
      },
      status: {
        type: "string",
        description: "Filtra datasources pelo status. Opcional.",
        enum: ["unsynched", "pending", "running", "synched", "error", "usage_limit_reached"],
      },
      type: {
        type: "string",
        description: "Filtra datasources pelo tipo. Opcional.",
        enum: ["file", "web_page", "web_site", "qa"],
      },
      offset: {
        type: "integer",
        description: "Número de páginas a pular para paginação das datasources. Opcional.",
      },
      limit: {
        type: "integer",
        description: "Número máximo de datasources a serem retornadas por página. Opcional.",
      },
      groupId: {
        type: "string",
        description: "Filtra datasources por um ID de grupo específico. Opcional.",
      },
    },
    required: ["id"],
  },
};

export async function handleGetDatastore(request: CallToolRequest) {
  if (request.params.name !== "get_datastore") {
    throw new Error("Unknown tool");
  }

  if (!request.params.arguments) {
    throw new Error("Missing arguments");
  }
  const { id, ...queryParams } = request.params.arguments;

  if (!id) {
    throw new Error("'id' is a required argument.");
  }

  const data = await getDatastoreById(String(id), queryParams);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}