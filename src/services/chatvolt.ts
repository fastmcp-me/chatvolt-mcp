/**
 * This service encapsulates all interactions with the Chatvolt API.
 */

/**
 * Fetches an agent from the Chatvolt API by its ID.
 * @param id - The ID or handle of the agent to fetch.
 * @returns The agent data.
 * @throws An error if the API key is not set or if the request fails.
 */
export async function getAgentById(id: string) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/agents/${id}`, {
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}
/**
 * Creates a new agent in Chatvolt.
 * @param agentData - The data for the new agent.
 * @returns The created agent data.
 * @throws An error if the API key is not set or if the request fails.
 */
export async function createAgent(agentData: {
  name: string;
  description?: string;
  modelName: string;
  systemPrompt?: string;
  temperature?: number;
  tools?: any[];
}) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/agents`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}