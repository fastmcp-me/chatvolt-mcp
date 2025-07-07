import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { createDatastore } from "../services/chatvolt.js";

export const createDatastoreTool: Tool = {
  name: "create_datastore",
  description: "Create a new Chatvolt datastore",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Datastore name. If not provided, a fun name will be generated automatically.",
      },
      description: {
        type: "string",
        description: "Datastore description.",
      },
      type: {
        type: "string",
        enum: ["qdrant"],
        description: "Datastore type (e.g., 'qdrant').",
      },
      isPublic: {
        type: "boolean",
        description: "Defines whether the datastore is public (accessible without specific datastore authentication) or private.",
        default: false,
      },
      pluginName: {
        type: "string",
        description: "Short name for the OpenAI plugin associated with this datastore (optional, used if the datastore is exposed as a plugin). Maximum of 20 characters.",
      },
      pluginDescriptionForHumans: {
        type: "string",
        description: "Human-readable description for the OpenAI plugin (optional). Maximum of 90 characters.",
      },
    },
    required: ["type"],
  },
};

export async function handleCreateDatastore(request: CallToolRequest) {
  if (request.params.name !== "create_datastore") {
    throw new Error("Unknown tool");
  }

  const {
    name,
    description,
    type,
    isPublic,
    pluginName,
    pluginDescriptionForHumans,
  } = request.params.arguments || {};

  if (!type) {
    throw new Error("'type' is a required argument.");
  }

  const datastoreData = {
    name: name ? String(name) : undefined,
    description: description ? String(description) : undefined,
    type: "qdrant" as const,
    isPublic: isPublic ? Boolean(isPublic) : undefined,
    pluginName: pluginName ? String(pluginName) : undefined,
    pluginDescriptionForHumans: pluginDescriptionForHumans
      ? String(pluginDescriptionForHumans)
      : undefined,
  };

  const data = await createDatastore(datastoreData);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}