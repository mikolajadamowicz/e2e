/** The key grammar's TV remote buttons, pressed through agent-device's `tv-remote`. */

import type { RemoteKeyName } from '@e2e-dev/core/engine';
import type { AgentDeviceClient } from './options.ts';
import type { InputBudget } from './support.ts';

type TvRemoteButton = Parameters<AgentDeviceClient['command']['tvRemote']>[0]['button'];

/**
 * agent-device's button for each remote key. `play` is the dedicated Play
 * button; the one that toggles is `play-pause`. agent-device refuses a button
 * the device has no remote key for (the media buttons on an Apple TV, every
 * button on a phone simulator), which reaches the test as
 * `UNSUPPORTED_CAPABILITY`.
 */
const REMOTE_BUTTONS = {
  menu: 'menu',
  home: 'home',
  play: 'media-play',
  pause: 'media-pause',
  'play-pause': 'media-play-pause',
  stop: 'media-stop',
  rewind: 'media-rewind',
  'fast-forward': 'media-fast-forward',
  next: 'media-next',
  previous: 'media-previous',
} as const satisfies Record<RemoteKeyName, TvRemoteButton>;

/** Presses one remote button, within the operation's budget. */
export function pressRemote(client: AgentDeviceClient, key: RemoteKeyName, input: InputBudget): Promise<unknown> {
  return input.send(() => client.command.tvRemote({ button: REMOTE_BUTTONS[key] }));
}
