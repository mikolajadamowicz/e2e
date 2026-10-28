/**
 * The agent-device client this engine runs on, re-exported for code that
 * needs a second client on the same device: a test helper or device bridge
 * that opens the engine's session (`session`, or the worker's) itself.
 * agent-device refuses to share one daemon between two versions, and pnpm
 * never resolves a bare `agent-device` import from a transitive dependency,
 * so a consumer that pinned its own copy had to keep that pin equal to this
 * package's. Importing from here gets the copy the engine resolved instead.
 * Only the client factory and its types are re-exported; the rest of
 * agent-device's surface is not part of this package's contract.
 */

export { createAgentDeviceClient } from 'agent-device';
export type { AgentDeviceClient, AgentDeviceClientConfig } from 'agent-device';
