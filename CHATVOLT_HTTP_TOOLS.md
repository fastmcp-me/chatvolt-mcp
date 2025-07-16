# Chatvolt HTTP Tools

This document provides a list of predefined templates for the HTTP tool for Chatvolt.

### Multi agents
Ask something to another Chatvolt agent.
```json
{
  "url": "https://api.chatvolt.ai/agents/<other-agent-id>/simplequery",
  "body": [
    {
      "key": "query",
      "value": "",
      "description": "Question to send to Fred.",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "conversationId",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "name": "Ask Fred",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "Run whenever you need to ask Fred something",
  "pathVariables": [],
  "queryParameters": []
}
```

### Disable AI (Intervene)
Turn off the agent in a conversation.
```json
{
  "url": "https://api.chatvolt.ai/conversations/:conversation_id/set-ai-enabled",
  "body": [
    {
      "key": "enabled",
      "value": "false"
    }
  ],
  "name": "Agent Turn off",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "Execute whenever the conversation reaches a situation where it is necessary to turn off the agent.",
  "pathVariables": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "queryParameters": []
}
```

### Transfer Conversations
Assign conversations to system users.
```json
{
  "url": "https://api.chatvolt.ai/conversations/:conversation_id/assign",
  "body": [
    {
      "key": "email",
      "value": "",
      "description": "user e-mail to transfer",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "name": "Transfer conversation",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "Execute whenever it is necessary to transfer the conversation to a specific user.",
  "pathVariables": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "queryParameters": []
}
```

### Set conversation Priority
Change the Priority of a conversation between HIGH, MEDIUM or LOW.
```json
{
  "url": "https://api.chatvolt.ai/conversations/:conversation_id/set-priority",
  "body": [
    {
      "key": "priority",
      "value": "",
      "description": "New conversation priority",
      "acceptedValues": [
        "HIGH",
        "MEDIUM",
        "LOW"
      ],
      "isUserProvided": true
    }
  ],
  "name": "Set conversation priority.",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "Execute whenever it is necessary to change the priority of a conversation between HIGH, MEDIUM, and LOW.",
  "pathVariables": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "queryParameters": []
}
```

### Set conversation Status
Change the Status of a conversation between RESOLVED, UNRESOLVED or HUMAN_REQUESTED.
```json
{
  "url": "https://api.chatvolt.ai/conversations/:conversation_id/set-status",
  "body": [
    {
      "key": "status",
      "value": "",
      "description": "New conversation status",
      "acceptedValues": [
        "RESOLVED",
        "UNRESOLVED",
        "HUMAN_REQUESTED"
      ],
      "isUserProvided": true
    }
  ],
  "name": "Set conversation status",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "Execute whenever it is necessary to change the status of a conversation between RESOLVED, UNRESOLVED or HUMAN_REQUESTED.",
  "pathVariables": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "queryParameters": []
}
```

### Read Conversations
Read another conversation to generate summaries or context for the ongoing conversation.
```json
{
  "url": "https://api.chatvolt.ai/conversation/:conversation_id/messages/30",
  "body": [],
  "name": "GetConversation",
  "method": "GET",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "GetConversation: Use to retrieve a conversation by ID",
  "pathVariables": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "Conversation Id provided by User",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "queryParameters": []
}
```

### Notifications via WhatsApp
Use your Z-API integration to send a WhatsApp notification to a specific number.
```json
{
  "url": "https://api.chatvolt.ai/zapi/<Z-API-Intance-Id>/<WhatsApp-Destination-Number>/message",
  "body": [
    {
      "key": "message",
      "value": "",
      "description": "Send a summary of the last confirmed order.",
      "acceptedValues": [],
      "isUserProvided": true
    }
  ],
  "name": "SendAdminNotification",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt API-Key>"
    }
  ],
  "description": "Execute to send a notification of a new order registered to the Admin.",
  "pathVariables": [],
  "queryParameters": []
}
```

### Add Custom Follow-up
Schedule the sending of customized Follow-up messages.
```json
{
  "url": "https://m.chatvolt.ai/custom-follow-up/add",
  "body": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "tag",
      "value": "reminder"
    },
    {
      "key": "msg",
      "value": "",
      "description": "Create a reminder message for the user about their request",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "channel",
      "value": "",
      "description": "use {channel}",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "dt_to_send",
      "value": "",
      "description": "Today Now + 1 hour in format YYYY-MM-DD HH:MM:SS",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "time_zone",
      "value": "Etc/UTC"
    }
  ],
  "name": "Create follow-up message",
  "method": "POST",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ],
  "description": "Execute when you need to schedule the sending of a future message or reminder.",
  "pathVariables": [],
  "queryParameters": []
}
```

### Remove Custom Follow-up
Remove a customized follow-up message from a specific tag.
```json
{
  "url": "https://m.chatvolt.ai/custom-follow-up/remove?conversation_id=&tag=reminder",
  "body": [],
  "name": "Remove Follow-up message",
  "method": "DELETE",
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer <Chatvolt-API-Key>"
    }
  ],
  "description": "Execute when you need to remove a future message or reminder.",
  "pathVariables": [],
  "queryParameters": [
    {
      "key": "conversation_id",
      "value": "",
      "description": "use {conversation-id}",
      "acceptedValues": [],
      "isUserProvided": true
    },
    {
      "key": "tag",
      "value": "reminder",
      "description": "",
      "acceptedValues": [],
      "isUserProvided": false
    }
  ]
}