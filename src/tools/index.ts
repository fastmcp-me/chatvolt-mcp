import { getAgentTool, handleGetAgent } from "./getAgent.js";

export const tools = [getAgentTool];
export const toolHandlers = {
  [getAgentTool.name]: handleGetAgent,
};