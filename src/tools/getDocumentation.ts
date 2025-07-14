import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import fs from 'fs/promises';
import path from 'path';

const DOC_FILES = {
  tools: 'TOOL_DESCRIPTIONS.md',
  models: 'MODELS.md',
  prompts: 'SYSTEM_PROMPTS.md',
};

export const getDocumentationTool: Tool = {
  name: "getDocumentation",
  description: `Retrieves the content of a specified documentation file.

Parameters:
- \`docType\` (string, required): The type of documentation to retrieve. (values: tools, models, prompts)`,
  inputSchema: {
    type: "object",
    properties: {
      docType: {
        type: "string",
        enum: ["tools", "models", "prompts"],
        description: "The type of documentation to retrieve."
      },
    },
    required: ["docType"],
  },
};

export async function handleGetDocumentation(request: CallToolRequest) {
  const { docType } = request.params.arguments || {};

  if (!docType || typeof docType !== 'string' || !['tools', 'models', 'prompts'].includes(docType)) {
    throw new Error(`Invalid docType: ${docType}`);
  }

  const docTypeKey = docType as keyof typeof DOC_FILES;
  const fileName = DOC_FILES[docTypeKey];

  try {
    const filePath = path.join(process.cwd(), fileName);
    const content = await fs.readFile(filePath, 'utf-8');
    return {
        content: [
            {
                type: "text",
                text: content,
            },
        ],
    };
  } catch (error) {
    console.error(`Error reading documentation file: ${fileName}`, error);
    return {
        content: [
            {
                type: "text",
                text: `Error retrieving documentation for ${docType}.`,
            },
        ],
    };
  }
}