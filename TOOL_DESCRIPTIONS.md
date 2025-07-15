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

Partially updates an existing agent based on the ID. Allows updating one or more fields of a specific agent. Only the fields provided in the request body will be updated.

*   **`id`** (string, required): ID of the agent to be updated.
*   **`name`** (string): New name for the agent.
*   **`description`** (string): New description for the agent.
*   **`modelName`** (string): New LLM model to be used by the agent. Check the API for available model names. (values: gpt_41_nano, gpt_41_mini, gpt_41, gpt_4o_mini, gpt_4o_mini_search...)
*   **`temperature`** (number): New model temperature (min 0.0, max 1.0).
*   **`systemPrompt`** (string): New system prompt for the agent.
*   **`visibility`** (string): New visibility for the agent. (values: public, private)
*   **`handle`** (string): New unique identifier (slug) for the agent.
*   **`interfaceConfig`** (object): New chat interface settings for this agent. Replaces the existing object.
*   **`configUrlExternal`** (object): New external URL configurations. Replaces the existing object.
*   **`configUrlInfosSystemExternal`** (object): New external URL configurations of the system. Replaces the existing object.

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

## Agent Tool Management

### addHttpTool

Adds a new, fully configured HTTP tool to an existing Chatvolt agent. This tool is designed to create complex HTTP integrations by defining endpoints, methods, headers, and dynamic parameters in a single operation.

**Parâmetros Principais:**
- **agentId** (`string`): O ID do agente que será modificado.
- **config** (`object`): O objeto de configuração que define a requisição HTTP.

**Estrutura do Objeto `config`:**
- **url** (`string`): O URL do endpoint. Pode conter placeholders para variáveis, como `/users/{userId}`.
- **method** (`string`): O método HTTP (`GET`, `POST`, `PUT`, etc.).
- **name** (`string`): Um nome claro e descritivo para a ferramenta.
- **description** (`string`): Uma descrição detalhada da função da ferramenta, para ser entendida pelo LLM.
- **headers** (`Array<object>`, opcional): Usado para autenticação, tipo de conteúdo, etc.
- **body** (`Array<object>`, opcional): Parâmetros do corpo da requisição (para `POST`, `PUT`).
- **pathVariables** (`Array<object>`, opcional): Variáveis para substituir os placeholders no URL.
- **queryParameters** (`Array<object>`, opcional): Parâmetros de consulta do URL.

**Estrutura dos Objetos de Parâmetro (dentro de `headers`, `body`, etc.):**
- **key** (`string`): O nome do parâmetro (ex: "Authorization").
- **value** (`string`): Um valor padrão ou fixo.
- **description** (`string`): A descrição do propósito do parâmetro.
- **acceptedValues** (`Array<string>`): Valores específicos permitidos. Deixe vazio (`[]`) se qualquer valor for aceito.
- **isUserProvided** (`boolean`): Se `true`, o LLM pedirá o valor ao usuário. Se `false`, o `value` é usado como um valor fixo.

---

**Exemplo de Uso Complexo:**

O exemplo a seguir cria uma ferramenta para buscar os detalhes de um pedido específico de um cliente em uma API de e-commerce.

```json
{
  "agentId": "cmcck6suz0mirbho6ciujkywv",
  "config": {
    "name": "Get User Order Details",
    "description": "Fetches specific order details for a given user from the e-commerce API.",
    "url": "https://api.yourecommerce.com/v1/users/{userId}/orders/{orderId}",
    "method": "GET",
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer YOUR_STATIC_API_KEY",
        "description": "API authentication token.",
        "acceptedValues": [],
        "isUserProvided": false
      }
    ],
    "pathVariables": [
      {
        "key": "userId",
        "value": "",
        "description": "The unique ID of the user.",
        "acceptedValues": [],
        "isUserProvided": true
      },
      {
        "key": "orderId",
        "value": "",
        "description": "The ID of the order to retrieve.",
        "acceptedValues": [],
        "isUserProvided": true
      }
    ],
    "queryParameters": [
      {
        "key": "include_details",
        "value": "true",
        "description": "Set to 'true' to include full item details in the response.",
        "acceptedValues": ["true", "false"],
        "isUserProvided": true
      }
    ],
    "body": []
  }
}
```

### addDatastoreTool
Adds a new Datastore tool to an existing agent.
- **agentId**: The ID of the agent to modify.
- **datastoreId**: The ID of the Datastore to link.

### addDelayedResponsesTool
Adds a new Delayed Responses tool to an existing agent.
- **agentId**: The ID of the agent to add the tool to.
- **delay**: The delay time in seconds.

### addRequestHumanTool
Adds a new Request Human tool to an existing agent.
- **agentId**: The ID of the agent to add the tool to.

### addMarkAsResolvedTool
Adds a new Mark As Resolved tool to an existing agent.
- **agentId**: The ID of the agent to add the tool to.

### addFollowUpMessagesTool
Adds a new Follow Up Messages tool to an existing agent.
- **agentId**: The ID of the agent to add the tool to.
- **config**: The configuration for the follow-up messages tool (`messages`, `max_sends`, `interval_hours`).