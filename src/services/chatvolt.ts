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
export async function listCrmScenarios(agentId?: string) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const url = new URL(`https://api.chatvolt.ai/crm/scenario`);
  if (agentId) {
    url.searchParams.append("agentId", agentId);
  }

  const response = await fetch(url.toString(), {
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

export async function createCrmScenario(scenarioData: {
  name: string;
  description?: string;
}) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/scenario`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scenarioData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function updateCrmScenario(scenarioData: {
  id: string;
  name: string;
  description?: string;
}) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/scenario`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scenarioData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function deleteCrmScenario(id: string) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/scenario`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}
export async function listCrmSteps(scenarioId: string) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/step?scenarioId=${scenarioId}`, {
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

export async function createCrmStep(stepData: {
  scenarioId: string;
  name: string;
  description?: string;
  agentId?: string;
  trigger?: string;
  prompt?: string;
  initialMessage?: string;
  autoNextStepId?: string;
  autoNextTime?: number;
  defaultStatus?: string;
  defaultPriority?: string;
  assigneeLogicType?: string;
  selectedMembershipIdsForAssignee?: string[];
  isRequired?: boolean;
}) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/step`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function updateCrmStep(stepData: {
  id: string;
  name: string;
  description?: string;
  agentId?: string;
  trigger?: string;
  prompt?: string;
  initialMessage?: string;
  autoNextStepId?: string;
  autoNextTime?: number;
  defaultStatus?: string;
  defaultPriority?: string;
  assigneeLogicType?: string;
  selectedMembershipIdsForAssignee?: string[];
  isRequired?: boolean;
}) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/step`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stepData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}

export async function deleteCrmStep(id: string) {
  const apiKey = process.env.CHATVOLT_API_KEY;
  if (!apiKey) {
    throw new Error("CHATVOLT_API_KEY environment variable not set");
  }

  const response = await fetch(`https://api.chatvolt.ai/crm/step`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  return response.json();
}