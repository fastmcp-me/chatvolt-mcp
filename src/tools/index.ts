import { getAgentTool, handleGetAgent } from "./getAgent.js";
import { createAgentTool, handleCreateAgent } from "./createAgent.js";
import {
  listCrmScenariosTool,
  handleListCrmScenarios,
} from "./listCrmScenarios.js";
import {
  createCrmScenarioTool,
  handleCreateCrmScenario,
} from "./createCrmScenario.js";
import {
  updateCrmScenarioTool,
  handleUpdateCrmScenario,
} from "./updateCrmScenario.js";
import {
  deleteCrmScenarioTool,
  handleDeleteCrmScenario,
} from "./deleteCrmScenario.js";
import {
  listCrmStepsTool,
  handleListCrmSteps,
} from "./listCrmSteps.js";
import {
  createCrmStepTool,
  handleCreateCrmStep,
} from "./createCrmStep.js";
import {
  updateCrmStepTool,
  handleUpdateCrmStep,
} from "./updateCrmStep.js";
import {
  deleteCrmStepTool,
  handleDeleteCrmStep,
} from "./deleteCrmStep.js";
import {
  enableDisableAgentIntegrationTool,
  handleEnableDisableAgentIntegration,
} from "./enableDisableAgentIntegration.js";
import {
  updateAgentTool,
  handleUpdateAgent,
} from "./updateAgent.js";

export const tools = [
  getAgentTool,
  createAgentTool,
  listCrmScenariosTool,
  createCrmScenarioTool,
  updateCrmScenarioTool,
  deleteCrmScenarioTool,
  listCrmStepsTool,
  createCrmStepTool,
  updateCrmStepTool,
  deleteCrmStepTool,
  enableDisableAgentIntegrationTool,
  updateAgentTool,
];
export const toolHandlers = {
  [getAgentTool.name]: handleGetAgent,
  [createAgentTool.name]: handleCreateAgent,
  [listCrmScenariosTool.name]: handleListCrmScenarios,
  [createCrmScenarioTool.name]: handleCreateCrmScenario,
  [updateCrmScenarioTool.name]: handleUpdateCrmScenario,
  [deleteCrmScenarioTool.name]: handleDeleteCrmScenario,
  [listCrmStepsTool.name]: handleListCrmSteps,
  [createCrmStepTool.name]: handleCreateCrmStep,
  [updateCrmStepTool.name]: handleUpdateCrmStep,
  [deleteCrmStepTool.name]: handleDeleteCrmStep,
  [enableDisableAgentIntegrationTool.name]: handleEnableDisableAgentIntegration,
  [updateAgentTool.name]: handleUpdateAgent,
};