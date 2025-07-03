import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { createCrmStep } from "../services/chatvolt.js";

export const createCrmStepTool: Tool = {
  name: "create_crm_step",
  description: "Create a new CRM Step",
  inputSchema: {
    type: "object",
    properties: {
      scenarioId: {
        type: "string",
        description: "The ID of the CRM scenario to add the step to.",
      },
      name: {
        type: "string",
        description: "The name for the new CRM step.",
      },
      description: {
        type: "string",
        description: "An optional description for the CRM step.",
      },
      agentId: {
        type: "string",
        description: "Optional Agent ID to associate with this step.",
      },
      trigger: {
        type: "string",
        description:
          "A trigger condition or keyword for this step. Either this or 'prompt' is required.",
      },
      prompt: {
        type: "string",
        description:
          "The main prompt or instruction for this step. Either this or 'trigger' is required.",
      },
      initialMessage: {
        type: "string",
        description: "An initial message to be sent when this step is activated.",
      },
      autoNextStepId: {
        type: "string",
        description: "ID of the step to automatically transition to.",
      },
      autoNextTime: {
        type: "integer",
        description: "Time in seconds to wait before auto-transitioning.",
      },
      defaultStatus: {
        type: "string",
        enum: ["RESOLVED", "UNRESOLVED", "HUMAN_REQUESTED"],
        description: "Default status for conversations at this step.",
      },
      defaultPriority: {
        type: "string",
        enum: ["LOW", "MEDIUM", "HIGH"],
        description: "Default priority for conversations at this step.",
      },
      assigneeLogicType: {
        type: "string",
        enum: [
          "none",
          "clear",
          "single_user",
          "random_selected",
          "fair_distribution_selected",
        ],
        description: "Logic for assigning conversations at this step.",
      },
      selectedMembershipIdsForAssignee: {
        type: "array",
        items: {
          type: "string",
        },
        description:
          "List of membership IDs for assignee logic. Required for single_user, random_selected, and fair_distribution_selected.",
      },
      isRequired: {
        type: "boolean",
        description: "Indicates if this step is mandatory.",
      },
    },
    required: ["scenarioId", "name"],
  },
};

export async function handleCreateCrmStep(request: CallToolRequest) {
  if (request.params.name !== "create_crm_step") {
    throw new Error("Unknown tool");
  }

  const {
    scenarioId,
    name,
    description,
    agentId,
    trigger,
    prompt,
    initialMessage,
    autoNextStepId,
    autoNextTime,
    defaultStatus,
    defaultPriority,
    assigneeLogicType,
    selectedMembershipIdsForAssignee,
    isRequired,
  } = request.params.arguments || {};

  if (!scenarioId || !name) {
    throw new Error("'scenarioId' and 'name' are required arguments.");
  }

  const data = await createCrmStep({
    scenarioId: String(scenarioId),
    name: String(name),
    description: description ? String(description) : undefined,
    agentId: agentId ? String(agentId) : undefined,
    trigger: trigger ? String(trigger) : undefined,
    prompt: prompt ? String(prompt) : undefined,
    initialMessage: initialMessage ? String(initialMessage) : undefined,
    autoNextStepId: autoNextStepId ? String(autoNextStepId) : undefined,
    autoNextTime: autoNextTime ? Number(autoNextTime) : undefined,
    defaultStatus: defaultStatus ? String(defaultStatus) : undefined,
    defaultPriority: defaultPriority ? String(defaultPriority) : undefined,
    assigneeLogicType: assigneeLogicType ? String(assigneeLogicType) : undefined,
    selectedMembershipIdsForAssignee: selectedMembershipIdsForAssignee as
      | string[]
      | undefined,
    isRequired: isRequired ? Boolean(isRequired) : undefined,
  });

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}