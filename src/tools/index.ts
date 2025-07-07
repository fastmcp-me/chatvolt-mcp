import { getAgentTool, handleGetAgent } from "./getAgent.js";
import { createAgentTool, handleCreateAgent } from "./createAgent.js";
import { listAgentsTool, handleListAgents } from "./listAgents.js";
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
import { deleteAgentTool, handleDeleteAgent } from "./deleteAgent.js";
import { agentQueryTool, handleAgentQuery } from "./queryAgent.js";
import { listDatastoresTool, handleListDatastores } from "./listDatastores.js";
import { getDatastoreTool, handleGetDatastore } from "./getDatastore.js";
import { createDatasourceTool, handleCreateDatasource } from "./createDatasource.js";
import { createDatastoreTool, handleCreateDatastore } from "./createDatastore.js";

export const tools = [
  getAgentTool,
  createAgentTool,
  listAgentsTool,
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
  deleteAgentTool,
  agentQueryTool,
  listDatastoresTool,
  getDatastoreTool,
  createDatasourceTool,
  createDatastoreTool,
];
export const toolHandlers = {
  [getAgentTool.name]: handleGetAgent,
  [createAgentTool.name]: handleCreateAgent,
  [listAgentsTool.name]: handleListAgents,
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
  [deleteAgentTool.name]: handleDeleteAgent,
  [agentQueryTool.name]: handleAgentQuery,
  [listDatastoresTool.name]: handleListDatastores,
  [getDatastoreTool.name]: handleGetDatastore,
  [createDatasourceTool.name]: handleCreateDatasource,
  [createDatastoreTool.name]: handleCreateDatastore,
};