---
"@e2e-dev/mobile": patch
---

Add the `@e2e-dev/mobile/agent-device` subpath, which exports `createAgentDeviceClient` and the `AgentDeviceClient` and `AgentDeviceClientConfig` types from the agent-device copy the engine uses. A second client on the engine's session (a device bridge or a helper script) imports from here instead of pinning its own `agent-device`: two versions refuse to share one daemon, and pnpm does not resolve a bare `agent-device` import from a transitive dependency.
