import { CallToolRequest } from "@modelcontextprotocol/sdk/types.js";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import type { handleGetAgent } from "./tools/getAgent.js";
import type { handleCreateAgent } from "./tools/createAgent.js";
import type * as ChatvoltService from "./services/chatvolt.js";

jest.unstable_mockModule("./services/chatvolt.js", () => ({
  getAgentById: jest.fn(),
  createAgent: jest.fn(),
  deleteAgent: jest.fn(),
  agentQuery: jest.fn(),
  createDatasource: jest.fn(),
  updateAgent: jest.fn(),
}));

const {
  getAgentById,
  createAgent,
  deleteAgent,
  agentQuery,
  createDatasource,
  updateAgent,
} = (await import("./services/chatvolt.js")) as typeof ChatvoltService;

const { handleGetAgent: handleGetAgentFn } = await import(
  "./tools/getAgent.js"
);
const { handleCreateAgent: handleCreateAgentFn } = await import(
  "./tools/createAgent.js"
);
const { handleDeleteAgent: handleDeleteAgentFn } = await import(
  "./tools/deleteAgent.js"
);
const { handleAgentQuery: handleAgentQueryFn } = await import(
  "./tools/queryAgent.js"
);
const { handleCreateDatasource: handleCreateDatasourceFn } = await import(
  "./tools/createDatasource.js"
);
const { handleGetDocumentation: handleGetDocumentationFn } = await import(
  "./tools/getDocumentation.js"
);
const { handleAddHttpTool: handleAddHttpToolFn } = await import(
  "./tools/addHttpTool.js"
);
const { handleAddDatastoreTool: handleAddDatastoreToolFn } = await import(
  "./tools/addDatastoreTool.js"
);
const {
  handleAddDelayedResponsesTool: handleAddDelayedResponsesToolFn,
} = await import("./tools/addDelayedResponsesTool.js");
const { handleAddRequestHumanTool: handleAddRequestHumanToolFn } = await import(
  "./tools/addRequestHumanTool.js"
);
const { handleAddMarkAsResolvedTool: handleAddMarkAsResolvedToolFn } =
  await import("./tools/addMarkAsResolvedTool.js");
const { handleAddFollowUpMessagesTool: handleAddFollowUpMessagesToolFn } =
  await import("./tools/addFollowUpMessagesTool.js");

const mockedGetAgentById = getAgentById as jest.MockedFunction<
  typeof getAgentById
>;
const mockedCreateAgent = createAgent as jest.MockedFunction<
  typeof createAgent
>;
const mockedDeleteAgent = deleteAgent as jest.MockedFunction<
  typeof deleteAgent
>;
const mockedAgentQuery = agentQuery as jest.MockedFunction<typeof agentQuery>;
const mockedCreateDatasource = createDatasource as jest.MockedFunction<
  typeof createDatasource
>;
const mockedUpdateAgent = updateAgent as jest.MockedFunction<
  typeof updateAgent
>;

describe("Tool Handlers", () => {
  beforeEach(() => {
    mockedGetAgentById.mockReset();
    mockedCreateAgent.mockReset();
    mockedDeleteAgent.mockReset();
    mockedAgentQuery.mockReset();
    mockedCreateDatasource.mockReset();
    mockedUpdateAgent.mockReset();
  });

  describe("handleGetAgent", () => {
    it("should call getAgent with the correct parameters", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "get_agent",
          arguments: { id: "123" },
        },
      };
      mockedGetAgentById.mockResolvedValue({
        id: "123",
        name: "Test Agent",
      });

      await handleGetAgentFn(request);

      expect(mockedGetAgentById).toHaveBeenCalledWith("123");
    });

    it("should throw an error if id is missing", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "get_agent",
          arguments: {},
        },
      };

      await expect(handleGetAgentFn(request)).rejects.toThrow(
        "'id' is a required argument."
      );
    });
  });

  describe("handleCreateAgent", () => {
    it("should create an agent with all required parameters", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "create_agent",
          arguments: {
            name: "Test Agent",
            modelName: "gpt-4",
          },
        },
      };
      const expectedAgent = {
        id: "1",
        name: "Test Agent",
        modelName: "gpt-4",
      };
      mockedCreateAgent.mockResolvedValue(expectedAgent);
      const result = await handleCreateAgentFn(request);
      expect(mockedCreateAgent).toHaveBeenCalledWith({
        name: "Test Agent",
        modelName: "gpt-4",
        description: undefined,
        systemPrompt: undefined,
      });
      expect(result.content[0].text).toEqual(
        JSON.stringify(expectedAgent, null, 2)
      );
    });

    it("should create an agent with both required and optional parameters", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "create_agent",
          arguments: {
            name: "Full Agent",
            modelName: "gpt-4",
            description: "A full agent.",
            systemPrompt: "You are a helpful assistant.",
          },
        },
      };
      const expectedAgent = {
        id: "2",
        name: "Full Agent",
        modelName: "gpt-4",
        description: "A full agent.",
        systemPrompt: "You are a helpful assistant.",
      };
      mockedCreateAgent.mockResolvedValue(expectedAgent);
      const result = await handleCreateAgentFn(request);
      expect(mockedCreateAgent).toHaveBeenCalledWith({
        name: "Full Agent",
        modelName: "gpt-4",
        description: "A full agent.",
        systemPrompt: "You are a helpful assistant.",
      });
      expect(result.content[0].text).toEqual(
        JSON.stringify(expectedAgent, null, 2)
      );
    });

    it("should throw an error if required parameters are missing", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "create_agent",
          arguments: {
            name: "Missing Model",
          },
        },
      };
      await expect(handleCreateAgentFn(request)).rejects.toThrow(
        "'name' and 'modelName' are required arguments."
      );
    });

    it("should handle invalid parameter types by converting them to strings", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "create_agent",
          arguments: {
            name: 123,
            modelName: true,
          },
        },
      };
      const expectedAgent = {
        id: "3",
        name: "123",
        modelName: "true",
      };
      mockedCreateAgent.mockResolvedValue(expectedAgent);
      const result = await handleCreateAgentFn(request);
      expect(mockedCreateAgent).toHaveBeenCalledWith({
        name: "123",
        modelName: "true",
        description: undefined,
        systemPrompt: undefined,
      });
      expect(result.content[0].text).toEqual(
        JSON.stringify(expectedAgent, null, 2)
      );
    });
  });

  describe("handleDeleteAgent", () => {
    it("should call deleteAgent with the correct parameters", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "delete_agent",
          arguments: { id: "123" },
        },
      };
      mockedDeleteAgent.mockResolvedValue({
        id: "123",
        name: "Test Agent",
      });

      await handleDeleteAgentFn(request);

      expect(mockedDeleteAgent).toHaveBeenCalledWith("123");
    });

    it("should throw an error if id is missing", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "delete_agent",
          arguments: {},
        },
      };

      await expect(handleDeleteAgentFn(request)).rejects.toThrow(
        "'id' is a required argument."
      );
    });
  });

  describe("handleAgentQuery", () => {
    it("should call agentQuery with the correct parameters", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "agent_query",
          arguments: { id: "123", query: "Hello" },
        },
      };
      mockedAgentQuery.mockResolvedValue({
        answer: "Hi there!",
      });

      await handleAgentQueryFn(request);

      expect(mockedAgentQuery).toHaveBeenCalledWith("123", {
        query: "Hello",
      });
    });

    it("should throw an error if id is missing", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "agent_query",
          arguments: { query: "Hello" },
        },
      };

      await expect(handleAgentQueryFn(request)).rejects.toThrow(
        "'id' is a required argument."
      );
    });
  });

  describe("handleCreateDatasource", () => {
    it("should create a datasource with all required parameters", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "create_datasource",
          arguments: {
            datastoreId: "ds-123",
            name: "Test Datasource",
            text: "This is a test.",
          },
        },
      };
      const expectedDatasource = {
        id: "1",
        datastoreId: "ds-123",
        name: "Test Datasource",
        type: "file",
      };
      mockedCreateDatasource.mockResolvedValue(expectedDatasource);
      const result = await handleCreateDatasourceFn(request);
      expect(mockedCreateDatasource).toHaveBeenCalledWith({
        datastoreId: "ds-123",
        name: "Test Datasource",
        type: "file",
        config: {
          text: "This is a test.",
        },
      });
      expect(result.content[0].text).toEqual(
        JSON.stringify(expectedDatasource, null, 2)
      );
    });

    it("should throw an error if required parameters are missing", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "create_datasource",
          arguments: {
            name: "Missing Datastore ID",
          },
        },
      };
      await expect(handleCreateDatasourceFn(request)).rejects.toThrow(
        "'datastoreId', 'name' and 'text' are required arguments."
      );
    });
  });
  describe("handleGetDocumentation", () => {
    it("should return the content of TOOL_DESCRIPTIONS.md when docType is 'tools'", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "get_documentation",
          arguments: { docType: "tools" },
        },
      };

      const result = await handleGetDocumentationFn(request);
      expect(typeof result.content[0].text).toBe("string");
      expect(result.content[0].text.length).toBeGreaterThan(0);
    });

    it("should return the content of MODELS.md when docType is 'models'", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "get_documentation",
          arguments: { docType: "models" },
        },
      };

      const result = await handleGetDocumentationFn(request);
      expect(typeof result.content[0].text).toBe("string");
      expect(result.content[0].text.length).toBeGreaterThan(0);
    });

    it("should return the content of SYSTEM_PROMPTS.md when docType is 'prompts'", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "get_documentation",
          arguments: { docType: "prompts" },
        },
      };

      const result = await handleGetDocumentationFn(request);
      expect(typeof result.content[0].text).toBe("string");
      expect(result.content[0].text.length).toBeGreaterThan(0);
    });

    it("should throw an error for an invalid docType", async () => {
      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "get_documentation",
          arguments: { docType: "invalid_type" },
        },
      };

      await expect(handleGetDocumentationFn(request)).rejects.toThrow(
        "Invalid docType: invalid_type"
      );
    });
  });

  describe("addHttpTool", () => {
    it("should add a new HTTP tool to an agent", async () => {
      const mockAgentId = "agent-123";
      const mockInitialAgent = { id: mockAgentId, name: "Test Agent", tools: [] };
      const mockHttpConfig = {
        name: "Test HTTP Tool",
        description: "A test tool.",
        url: "https://api.example.com/test",
        method: "POST",
      };

      mockedGetAgentById.mockResolvedValue(mockInitialAgent);
      mockedUpdateAgent.mockImplementation((id, payload) =>
        Promise.resolve({ ...mockInitialAgent, ...payload })
      );

      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "add_http_tool",
          arguments: {
            agentId: mockAgentId,
            config: mockHttpConfig,
          },
        },
      };

      await handleAddHttpToolFn(request);

      expect(getAgentById).toHaveBeenCalledWith(mockAgentId);
      expect(updateAgent).toHaveBeenCalledWith(mockAgentId, {
        tools: [
          {
            type: "http",
            ...mockHttpConfig,
          },
        ],
      });
    });
  });

  describe("addDatastoreTool", () => {
    it("should add a new Datastore tool to an agent", async () => {
      const mockAgentId = "agent-456";
      const mockDatastoreId = "dstore-789";
      const mockInitialAgent = {
        id: mockAgentId,
        name: "Datastore Test Agent",
        tools: [],
      };

      mockedGetAgentById.mockResolvedValue(mockInitialAgent);
      mockedUpdateAgent.mockImplementation((id, payload) =>
        Promise.resolve({ ...mockInitialAgent, ...payload })
      );

      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "addDatastoreTool",
          arguments: {
            agentId: mockAgentId,
            datastoreId: mockDatastoreId,
          },
        },
      };

      await handleAddDatastoreToolFn(request);

      expect(updateAgent).toHaveBeenCalledWith(mockAgentId, {
        tools: [
          {
            type: "datastore",
            datastoreId: mockDatastoreId,
          },
        ],
      });
    });
  });

  describe("addDelayedResponsesTool", () => {
    it("should add a new Delayed Responses tool to an agent", async () => {
      const mockAgentId = "agent-delay";
      const mockDelay = 30;
      const mockInitialAgent = {
        id: mockAgentId,
        name: "Delayed Agent",
        tools: [],
      };

      mockedGetAgentById.mockResolvedValue(mockInitialAgent);
      mockedUpdateAgent.mockImplementation((id, payload) =>
        Promise.resolve({ ...mockInitialAgent, ...payload })
      );

      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "add_delayed_responses_tool",
          arguments: {
            agentId: mockAgentId,
            delay: mockDelay,
          },
        },
      };

      await handleAddDelayedResponsesToolFn(request);

      expect(mockedUpdateAgent).toHaveBeenCalledWith(mockAgentId, {
        tools: [
          {
            type: "delayed_responses",
            config: {
              delay: mockDelay,
            },
          },
        ],
      });
    });
  });

  describe("addRequestHumanTool", () => {
    it("should add a new Request Human tool to an agent", async () => {
      const mockAgentId = "agent-human";
      const mockInitialAgent = {
        id: mockAgentId,
        name: "Human Agent",
        tools: [],
      };

      mockedGetAgentById.mockResolvedValue(mockInitialAgent);
      mockedUpdateAgent.mockImplementation((id, payload) =>
        Promise.resolve({ ...mockInitialAgent, ...payload })
      );

      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: "addRequestHumanTool",
          arguments: {
            agentId: mockAgentId,
          },
        },
      };

      await handleAddRequestHumanToolFn(request);

      expect(mockedUpdateAgent).toHaveBeenCalledWith(mockAgentId, {
        tools: [
          {
            type: "request_human",
          },
        ],
      });
    });
  });
    describe('addMarkAsResolvedTool', () => {
      it('should add a new Mark As Resolved tool to an agent', async () => {
        const mockAgentId = 'agent-resolved';
        const mockInitialAgent = { id: mockAgentId, name: 'Resolved Agent', tools: [] };
  
        mockedGetAgentById.mockResolvedValue(mockInitialAgent);
        mockedUpdateAgent.mockImplementation((id, payload) =>
          Promise.resolve({ ...mockInitialAgent, ...payload })
        );
  
        const request: CallToolRequest = {
          method: 'tools/call',
          params: {
            name: 'addMarkAsResolvedTool',
            arguments: {
              agentId: mockAgentId,
            },
          },
        };
  
        await handleAddMarkAsResolvedToolFn(request);
  
        expect(mockedUpdateAgent).toHaveBeenCalledWith(mockAgentId, {
          tools: [
            {
              type: 'mark_as_resolved',
            },
          ],
        });
      });
    });
});
  describe('addFollowUpMessagesTool', () => {
    it('should add a new Follow Up Messages tool to an agent', async () => {
      const mockAgentId = 'agent-followup';
      const mockFollowUpConfig = {
        messages: 'Is there anything else I can help with?',
        max_sends: 2,
        interval_hours: 1,
      };
      const mockInitialAgent = { id: mockAgentId, name: 'Follow Up Agent', tools: [] };

      mockedGetAgentById.mockResolvedValue(mockInitialAgent);
      mockedUpdateAgent.mockImplementation((id, payload) => Promise.resolve({ ...mockInitialAgent, ...payload }));

      const request: CallToolRequest = {
        method: "tools/call",
        params: {
          name: 'add_follow_up_messages_tool',
          arguments: {
            agentId: mockAgentId,
            config: mockFollowUpConfig,
          },
        },
      };

      await handleAddFollowUpMessagesToolFn(request);

      expect(updateAgent).toHaveBeenCalledWith(mockAgentId, {
        tools: [
          {
            type: 'follow_up_messages',
            config: mockFollowUpConfig,
          },
        ],
      });
    });
  });