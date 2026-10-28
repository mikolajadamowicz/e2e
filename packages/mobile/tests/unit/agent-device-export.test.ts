/**
 * `@e2e-dev/mobile/agent-device` hands a second client the agent-device copy
 * this engine resolved: two versions refuse to share one daemon, so the
 * subpath must re-export the engine's own import, not a copy of it.
 */

import { readFileSync } from 'node:fs';
import * as agentDevice from 'agent-device';
import { describe, expect, it } from 'vitest';
import * as subpath from '../../src/agent-device.ts';

describe('@e2e-dev/mobile/agent-device', () => {
  it('re-exports the agent-device client factory the engine imports', () => {
    expect(subpath.createAgentDeviceClient).toBe(agentDevice.createAgentDeviceClient);
  });

  it('exports the client factory and nothing else at run time', () => {
    expect(Object.keys(subpath)).toEqual(['createAgentDeviceClient']);
  });

  it('is in the export map, built from its source module', () => {
    const manifest = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')) as {
      exports: Record<string, { types: string; default: string }>;
    };
    expect(manifest.exports['./agent-device']).toEqual({
      types: './dist/agent-device.d.ts',
      default: './dist/agent-device.js',
    });
  });
});
