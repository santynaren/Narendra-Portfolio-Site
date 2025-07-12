---
title: "MCP Client Development: Building Intelligent Integrations"
date: "2025-06-15"
description: "Master MCP client development with practical examples, integration patterns, and best practices for building AI-powered applications"
category: "MCP Development"
tags: ["MCP", "Client Development", "AI Integration", "Frontend", "JavaScript"]
type: "blog"
---

# MCP Client Development: Building Intelligent Integrations

The Model Context Protocol (MCP) has revolutionized how we integrate AI capabilities into applications, but the real magic happens on the client side. MCP clients are the bridge between your application's user interface and the powerful AI services running on MCP servers.

In this comprehensive guide, we'll explore how to build sophisticated MCP clients that can seamlessly integrate AI capabilities into modern web applications, mobile apps, and desktop software.

## Understanding MCP Client Architecture

MCP clients serve as the intermediary layer that translates user interactions into structured requests for AI models and MCP servers. Unlike traditional API clients, MCP clients need to handle:

- **Dynamic tool discovery** from multiple MCP servers
- **Context management** across extended conversations
- **Real-time streaming** for long-running AI operations
- **Multi-modal interactions** involving text, images, audio, and more
- **Graceful fallbacks** when services are unavailable

### Core Client Components

A well-architected MCP client consists of several key layers:

```typescript
// Client Architecture Overview
interface MCPClientArchitecture {
  transport: TransportLayer;        // HTTP/WebSocket/gRPC
  protocol: ProtocolHandler;        // MCP message handling
  session: SessionManager;          // Context and state
  tools: ToolManager;              // Dynamic tool discovery
  resources: ResourceManager;       // Data source access
  ui: UserInterface;               // Application integration
}
```

## Setting Up Your MCP Client

Let's start by building a modern MCP client using TypeScript and React:

```bash
npm create vite@latest mcp-client-app -- --template react-ts
cd mcp-client-app
npm install @anthropic/mcp-client axios
npm install -D @types/uuid uuid
```

### Basic Client Implementation

Here's the foundation for a robust MCP client:

```typescript
// src/lib/MCPClient.ts
import { Client } from '@anthropic/mcp-client';
import { StdioClientTransport } from '@anthropic/mcp-client/stdio';

export class MCPClient {
  private client: Client;
  private transport: StdioClientTransport;
  private connected: boolean = false;
  private tools: Map<string, any> = new Map();
  private resources: Map<string, any> = new Map();

  constructor(private serverCommand: string[]) {
    this.transport = new StdioClientTransport(serverCommand);
    this.client = new Client(
      {
        name: "my-mcp-client",
        version: "1.0.0"
      },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        }
      }
    );
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect(this.transport);
      this.connected = true;
      await this.discoverCapabilities();
      console.log('MCP Client connected successfully');
    } catch (error) {
      console.error('Failed to connect to MCP server:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
    }
  }

  private async discoverCapabilities(): Promise<void> {
    // Discover available tools
    try {
      const toolsResponse = await this.client.request(
        { method: "tools/list" },
        { method: "tools/list", params: {} }
      );
      
      toolsResponse.tools?.forEach(tool => {
        this.tools.set(tool.name, tool);
      });
    } catch (error) {
      console.warn('Failed to discover tools:', error);
    }

    // Discover available resources
    try {
      const resourcesResponse = await this.client.request(
        { method: "resources/list" },
        { method: "resources/list", params: {} }
      );
      
      resourcesResponse.resources?.forEach(resource => {
        this.resources.set(resource.uri, resource);
      });
    } catch (error) {
      console.warn('Failed to discover resources:', error);
    }
  }

  async callTool(name: string, args: any): Promise<any> {
    if (!this.connected) {
      throw new Error('Client not connected');
    }

    if (!this.tools.has(name)) {
      throw new Error(`Tool '${name}' not available`);
    }

    try {
      const response = await this.client.request(
        { method: "tools/call" },
        {
          method: "tools/call",
          params: { name, arguments: args }
        }
      );

      return response;
    } catch (error) {
      console.error(`Tool call failed for '${name}':`, error);
      throw error;
    }
  }

  async readResource(uri: string): Promise<any> {
    if (!this.connected) {
      throw new Error('Client not connected');
    }

    try {
      const response = await this.client.request(
        { method: "resources/read" },
        {
          method: "resources/read",
          params: { uri }
        }
      );

      return response;
    } catch (error) {
      console.error(`Resource read failed for '${uri}':`, error);
      throw error;
    }
  }

  getAvailableTools(): string[] {
    return Array.from(this.tools.keys());
  }

  getAvailableResources(): string[] {
    return Array.from(this.resources.keys());
  }

  getToolSchema(name: string): any {
    return this.tools.get(name)?.inputSchema;
  }
}
```

## Building a React Integration

Now let's create React hooks and components that make MCP integration seamless:

### Custom Hooks for MCP

```typescript
// src/hooks/useMCPClient.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { MCPClient } from '../lib/MCPClient';

export interface MCPClientState {
  client: MCPClient | null;
  connected: boolean;
  loading: boolean;
  error: string | null;
  tools: string[];
  resources: string[];
}

export function useMCPClient(serverCommand: string[]) {
  const [state, setState] = useState<MCPClientState>({
    client: null,
    connected: false,
    loading: false,
    error: null,
    tools: [],
    resources: []
  });

  const clientRef = useRef<MCPClient | null>(null);

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const client = new MCPClient(serverCommand);
      await client.connect();
      
      clientRef.current = client;
      setState({
        client,
        connected: true,
        loading: false,
        error: null,
        tools: client.getAvailableTools(),
        resources: client.getAvailableResources()
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  }, [serverCommand]);

  const disconnect = useCallback(async () => {
    if (clientRef.current) {
      await clientRef.current.disconnect();
      clientRef.current = null;
      setState({
        client: null,
        connected: false,
        loading: false,
        error: null,
        tools: [],
        resources: []
      });
    }
  }, []);

  const callTool = useCallback(async (name: string, args: any) => {
    if (!clientRef.current) {
      throw new Error('Client not connected');
    }
    return await clientRef.current.callTool(name, args);
  }, []);

  const readResource = useCallback(async (uri: string) => {
    if (!clientRef.current) {
      throw new Error('Client not connected');
    }
    return await clientRef.current.readResource(uri);
  }, []);

  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
      }
    };
  }, []);

  return {
    ...state,
    connect,
    disconnect,
    callTool,
    readResource
  };
}
```

### AI Chat Interface Component

```typescript
// src/components/AIChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useMCPClient } from '../hooks/useMCPClient';

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

interface ToolCall {
  name: string;
  args: any;
  result?: any;
  error?: string;
}

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mcpClient = useMCPClient(['node', './mcp-server.js']);

  useEffect(() => {
    mcpClient.connect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    setMessages(prev => [...prev, {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }]);
  };

  const processUserMessage = async (userInput: string) => {
    if (!mcpClient.connected || !userInput.trim()) return;

    setIsProcessing(true);
    addMessage({ type: 'user', content: userInput });

    try {
      // Simple tool detection (in practice, you'd use more sophisticated NLP)
      const toolCalls = await detectAndExecuteTools(userInput);
      
      if (toolCalls.length > 0) {
        addMessage({
          type: 'assistant',
          content: `I executed ${toolCalls.length} tool(s) for you.`,
          toolCalls
        });
      } else {
        // Forward to AI model for general conversation
        const response = await processWithAI(userInput);
        addMessage({ type: 'assistant', content: response });
      }
    } catch (error) {
      addMessage({
        type: 'system',
        content: `Error: ${error.message}`
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const detectAndExecuteTools = async (input: string): Promise<ToolCall[]> => {
    const toolCalls: ToolCall[] = [];

    // Simple keyword-based tool detection
    if (input.toLowerCase().includes('search')) {
      const searchQuery = extractSearchQuery(input);
      if (searchQuery) {
        try {
          const result = await mcpClient.callTool('search_database', {
            query: searchQuery,
            limit: 10
          });
          toolCalls.push({
            name: 'search_database',
            args: { query: searchQuery, limit: 10 },
            result
          });
        } catch (error) {
          toolCalls.push({
            name: 'search_database',
            args: { query: searchQuery, limit: 10 },
            error: error.message
          });
        }
      }
    }

    // Add more tool detection logic here
    return toolCalls;
  };

  const extractSearchQuery = (input: string): string | null => {
    const matches = input.match(/search\s+(?:for\s+)?(.+)/i);
    return matches ? matches[1].trim() : null;
  };

  const processWithAI = async (input: string): Promise<string> => {
    // In a real implementation, this would call your AI model
    // with context from MCP resources
    return `I understand you said: "${input}". How can I help you further?`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processUserMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="connection-status">
        <span className={`status-indicator ${mcpClient.connected ? 'connected' : 'disconnected'}`}>
          {mcpClient.connected ? '🟢 Connected' : '🔴 Disconnected'}
        </span>
        {mcpClient.tools.length > 0 && (
          <span className="tools-count">
            {mcpClient.tools.length} tools available
          </span>
        )}
      </div>

      <div className="messages-container">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-content">{message.content}</div>
            {message.toolCalls && (
              <div className="tool-calls">
                {message.toolCalls.map((call, index) => (
                  <div key={index} className="tool-call">
                    <strong>🔧 {call.name}</strong>
                    <pre>{JSON.stringify(call.args, null, 2)}</pre>
                    {call.result && (
                      <div className="tool-result">
                        <strong>Result:</strong>
                        <pre>{JSON.stringify(call.result, null, 2)}</pre>
                      </div>
                    )}
                    {call.error && (
                      <div className="tool-error">
                        <strong>Error:</strong> {call.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={!mcpClient.connected || isProcessing}
          className="message-input"
        />
        <button
          type="submit"
          disabled={!mcpClient.connected || isProcessing || !input.trim()}
          className="send-button"
        >
          {isProcessing ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  );
}
```

## Advanced Client Patterns

### Context Management

Effective context management is crucial for maintaining conversation state:

```typescript
// src/lib/ContextManager.ts
export class ContextManager {
  private context: Map<string, any> = new Map();
  private history: Array<{ timestamp: Date, action: string, data: any }> = [];
  private maxHistorySize = 1000;

  setContext(key: string, value: any): void {
    this.context.set(key, value);
    this.addToHistory('context_set', { key, value });
  }

  getContext(key: string): any {
    return this.context.get(key);
  }

  getAllContext(): Record<string, any> {
    return Object.fromEntries(this.context);
  }

  clearContext(key?: string): void {
    if (key) {
      this.context.delete(key);
      this.addToHistory('context_clear', { key });
    } else {
      this.context.clear();
      this.addToHistory('context_clear_all', {});
    }
  }

  private addToHistory(action: string, data: any): void {
    this.history.push({
      timestamp: new Date(),
      action,
      data
    });

    // Trim history if it gets too large
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize);
    }
  }

  getRecentHistory(limit: number = 10): Array<any> {
    return this.history.slice(-limit);
  }

  exportContext(): string {
    return JSON.stringify({
      context: this.getAllContext(),
      history: this.getRecentHistory(50)
    }, null, 2);
  }

  importContext(data: string): void {
    try {
      const imported = JSON.parse(data);
      if (imported.context) {
        Object.entries(imported.context).forEach(([key, value]) => {
          this.setContext(key, value);
        });
      }
    } catch (error) {
      throw new Error(`Failed to import context: ${error.message}`);
    }
  }
}
```

### Multi-Server Management

Handle multiple MCP servers simultaneously:

```typescript
// src/lib/MultiServerClient.ts
export class MultiServerClient {
  private servers: Map<string, MCPClient> = new Map();
  private contexts: Map<string, ContextManager> = new Map();

  async addServer(name: string, command: string[]): Promise<void> {
    const client = new MCPClient(command);
    const context = new ContextManager();
    
    await client.connect();
    
    this.servers.set(name, client);
    this.contexts.set(name, context);
  }

  async removeServer(name: string): Promise<void> {
    const client = this.servers.get(name);
    if (client) {
      await client.disconnect();
      this.servers.delete(name);
      this.contexts.delete(name);
    }
  }

  async callTool(serverName: string, toolName: string, args: any): Promise<any> {
    const client = this.servers.get(serverName);
    if (!client) {
      throw new Error(`Server '${serverName}' not found`);
    }
    return await client.callTool(toolName, args);
  }

  async broadcastToolCall(toolName: string, args: any): Promise<Map<string, any>> {
    const results = new Map<string, any>();
    
    for (const [serverName, client] of this.servers) {
      try {
        if (client.getAvailableTools().includes(toolName)) {
          const result = await client.callTool(toolName, args);
          results.set(serverName, result);
        }
      } catch (error) {
        results.set(serverName, { error: error.message });
      }
    }
    
    return results;
  }

  getServerStatus(): Map<string, boolean> {
    const status = new Map<string, boolean>();
    for (const [name, client] of this.servers) {
      status.set(name, client.connected);
    }
    return status;
  }

  getAllAvailableTools(): Map<string, string[]> {
    const tools = new Map<string, string[]>();
    for (const [name, client] of this.servers) {
      tools.set(name, client.getAvailableTools());
    }
    return tools;
  }
}
```

## Error Handling and Resilience

Build robust error handling into your MCP client:

```typescript
// src/lib/ErrorHandler.ts
export class MCPErrorHandler {
  private retryAttempts = 3;
  private retryDelay = 1000; // milliseconds
  private circuitBreaker = new Map<string, { failures: number, lastFailure: Date }>();

  async withRetry<T>(
    operation: () => Promise<T>,
    context: string = 'unknown'
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const result = await operation();
        this.resetCircuitBreaker(context);
        return result;
      } catch (error) {
        lastError = error;
        
        if (this.shouldCircuitBreak(context)) {
          throw new Error(`Circuit breaker open for ${context}: ${error.message}`);
        }
        
        this.recordFailure(context);
        
        // Don't retry on client errors (4xx)
        if (this.isClientError(error)) {
          break;
        }
        
        if (attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);
        }
      }
    }
    
    throw lastError;
  }

  private shouldCircuitBreak(context: string): boolean {
    const state = this.circuitBreaker.get(context);
    if (!state) return false;
    
    const timeSinceLastFailure = Date.now() - state.lastFailure.getTime();
    const circuitTimeout = 30000; // 30 seconds
    
    return state.failures >= 5 && timeSinceLastFailure < circuitTimeout;
  }

  private recordFailure(context: string): void {
    const current = this.circuitBreaker.get(context) || { failures: 0, lastFailure: new Date(0) };
    this.circuitBreaker.set(context, {
      failures: current.failures + 1,
      lastFailure: new Date()
    });
  }

  private resetCircuitBreaker(context: string): void {
    this.circuitBreaker.delete(context);
  }

  private isClientError(error: any): boolean {
    return error.status >= 400 && error.status < 500;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```