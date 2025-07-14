# Tool Parameter Descriptions

This document provides a detailed description of each tool and its parameters.

## `create_agent`

Creates a new Chatvolt agent.

*   **`name`** (string, required): The name of the agent. This is a human-readable identifier for the agent.
*   **`description`** (string, required): A detailed description of the agent's purpose and capabilities.
*   **`modelName`** (string, required): The specific AI model the agent will use (e.g., 'gpt-4', 'claude_3_sonnet').
*   **`systemPrompt`** (string, required): The initial instructions or context given to the agent to define its personality, role, and behavior.
*   **`temperature`** (number, optional): Controls the randomness of the model's output. A value closer to 0 makes the output more deterministic, while a value closer to 1 makes it more creative.
*   **`tools`** (array, optional): A list of tools that the agent can use to perform actions.

## `update_agent`

Updates an existing agent's properties.

*   **`id`** (string, required): The unique identifier of the agent to be updated.
*   **Other optional parameters** (`name`, `description`, etc.): Any other agent property can be provided to update its value.

## `delete_agent`

Deletes a specified agent.

*   **`id`** (string, required): The unique identifier of the agent to be deleted.

## `list_agents`

Retrieves a list of all available agents.

*   This tool takes no parameters.

## `get_agent`

Retrieves detailed information about a single agent.

*   **`id`** (string, required): The unique identifier of the agent to retrieve.

## `agent_query`

Sends a query or message to an agent for processing.

*   **`id`** (string, required): The unique identifier of the agent that will receive the query.
*   **`query`** (string, required): The text of the question or command to be sent to the agent.
*   **`conversationId`** (string, optional): The identifier for an existing conversation. If provided, the query will be part of that conversation's history.

## `enable_disable_agent_integration`

Enables or disables a specific integration for an agent.

*   **`id`** (string, required): The unique identifier of the agent.
*   **`type`** (string, required): The type of integration to modify (e.g., 'whatsapp', 'telegram').
*   **`enabled`** (boolean, required): Set to `true` to enable the integration or `false` to disable it.

## `create_crm_scenario`

Creates a new scenario within the CRM.

*   **`name`** (string, required): The name of the new CRM scenario.
*   **`description`** (string, optional): A description of the scenario's purpose.

## `update_crm_scenario`

Updates an existing CRM scenario.

*   **`id`** (string, required): The unique identifier of the scenario to update.
*   **`name`** (string, required): The new name for the scenario.
*   **`description`** (string, optional): The new description for the scenario.

## `delete_crm_scenario`

Deletes a CRM scenario.

*   **`id`** (string, required): The unique identifier of the scenario to delete.

## `list_crm_scenarios`

Lists all CRM scenarios.

*   **`agentId`** (string, optional): If provided, filters the list to show only scenarios associated with this agent ID.

## `create_crm_step`

Creates a new step within a CRM scenario.

*   **`scenarioId`** (string, required): The unique identifier of the scenario to which this step will be added.
*   **`name`** (string, required): The name of the new step.

## `update_crm_step`

Updates an existing step in a CRM scenario.

*   **`id`** (string, required): The unique identifier of the step to update.
*   **`name`** (string, required): The new name for the step.

## `delete_crm_step`

Deletes a step from a CRM scenario.

*   **`id`** (string, required): The unique identifier of the step to delete.

## `list_crm_steps`

Lists all steps for a given CRM scenario.

*   **`scenarioId`** (string, required): The unique identifier of the scenario whose steps are to be listed.

## `create_datastore`

Creates a new datastore.

*   **`type`** (string, required): The type of datastore to create (e.g., 'qdrant').
*   **`name`** (string, optional): A name for the datastore.
*   **`description`** (string, optional): A description of the datastore's content or purpose.

## `get_datastore`

Retrieves information about a specific datastore.

*   **`id`** (string, required): The unique identifier of the datastore to retrieve.
*   **`search`** (string, optional): A search term to find specific data within the datastore.

## `list_datastores`

Retrieves a list of all datastores.

*   This tool takes no parameters.

## `create_datasource`

Creates a new data source within a datastore.

*   **`datastoreId`** (string, required): The unique identifier of the datastore where the data source will be created.
*   **`name`** (string, required): The name of the data source, often used as a filename.
*   **`text`** (string, required): The actual text content of the data source.