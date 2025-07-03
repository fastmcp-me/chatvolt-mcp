import { getAgentTool, handleGetAgent } from "./getAgent.js";
import { createAgentTool, handleCreateAgent } from "./createAgent.js";

export const tools = [getAgentTool, createAgentTool];
export const toolHandlers = {
  [getAgentTool.name]: handleGetAgent,
  [createAgentTool.name]: handleCreateAgent,
};