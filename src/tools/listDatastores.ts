import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { listDatastores } from "../services/chatvolt.js";

export const listDatastoresTool: Tool = {
  name: "list_datastores",
  description: `List all Chatvolt datastores`,
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export async function handleListDatastores(request: CallToolRequest) {
  if (request.params.name !== "list_datastores") {
    throw new Error("Unknown tool");
  }

  const data = await listDatastores();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}