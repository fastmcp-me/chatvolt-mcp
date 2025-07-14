import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { updateCrmStep } from "../services/chatvolt.js";

export const updateCrmStepTool: Tool = {
  name: "update_crm_step",
  description: `Update a CRM Step

Parameters:
- \`id\` (string, required): The ID of the CRM step to update.
- \`name\` (string, required): The new name for the CRM step.
- \`description\` (string): An optional new description for the CRM step.
- \`agentId\` (string): Optional Agent ID to associate with this step.
- \`trigger\` (string): A trigger condition or keyword for this step. Either this or 'prompt' is required.
- \`prompt\` (string): The main prompt or instruction for this step. Either this or 'trigger' is required.
- \`initialMessage\` (string): An initial message to be sent when this step is activated.
- \`autoNextStepId\` (string): ID of the step to automatically transition to.
- \`autoNextTime\` (integer): Time in seconds to wait before auto-transitioning.
- \`defaultStatus\` (string): Default status for conversations at this step. (values: RESOLVED, UNRESOLVED, HUMAN_REQUESTED)
- \`defaultPriority\` (string): Default priority for conversations at this step. (values: LOW, MEDIUM, HIGH)
- \`assigneeLogicType\` (string): Logic for assigning conversations at this step. (values: none, clear, single_user, random_selected, fair_distribution_selected)
- \`selectedMembershipIdsForAssignee\` (array): List of membership IDs for assignee logic. Required for single_user, random_selected, and fair_distribution_selected.
- \`isRequired\` (boolean): Indicates if this step is mandatory.`,
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the CRM step to update.",
      },
      name: {
        type: "string",
        description: "The new name for the CRM step.",
      },
      description: {
        type: "string",
        description: "An optional new description for the CRM step.",
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
    required: ["id", "name"],
  },
};

export async function handleUpdateCrmStep(request: CallToolRequest) {
  if (request.params.name !== "update_crm_step") {
    throw new Error("Unknown tool");
  }

  const {
    id,
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

  if (!id || !name) {
    throw new Error("'id' and 'name' are required arguments.");
  }

  const data = await updateCrmStep({
    id: String(id),
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