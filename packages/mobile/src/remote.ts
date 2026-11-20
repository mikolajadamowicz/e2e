/** The key grammar's TV remote buttons, pressed through agent-device's `tv-remote`. */

import { TestError, type RemoteKeyName } from '@e2e-dev/core/engine';
import type { AgentDeviceClient } from './options.ts';
import type { InputBudget } from './support.ts';

type TvRemoteButton = Parameters<AgentDeviceClient['command']['tvRemote']>[0]['button'];

/**
 * agent-device's button for each remote key. `play` is the dedicated Play
 * button; the one that toggles, which most Android TV remotes carry, is
 * `play-pause`. agent-device serves `tv-remote` on Android TV and tvOS
 * targets only, so any other device refuses every button, and an Apple TV
 * refuses the media buttons; either reaches the test as
 * `UNSUPPORTED_CAPABILITY`.
 */
const REMOTE_BUTTONS = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
  select: 'select',
  back: 'back',
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

/**
 * The remote keys this engine presses, read from its own table so an older
 * `@e2e-dev/core` without `REMOTE_KEY_NAMES` still loads the engine.
 */
export const REMOTE_KEYS: readonly string[] = Object.keys(REMOTE_BUTTONS);

/** The remote key a keyboard key's user most likely meant on a TV. */
const REMOTE_FOR_KEYBOARD: Readonly<Record<string, string>> = {
  Home: 'home',
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Escape: 'back',
  Backspace: 'back',
};

/**
 * Why a device cannot press a named keyboard key, with the remote key to
 * press instead when there is one.
 */
export function cannotPressNamedKey(name: string): string {
  const remote = REMOTE_FOR_KEYBOARD[name];
  return (
    `agent-device cannot press ${name} on a device surface; only Enter, Space, and single characters reach the soft keyboard. ` +
    (remote === undefined
      ? `On a TV, press a remote button by its lowercase name: ${REMOTE_KEYS.join(', ')}`
      : `On a TV, the remote's button is "${remote}"`)
  );
}

/** Presses one remote button, within the operation's budget. */
export function pressRemote(client: AgentDeviceClient, key: RemoteKeyName, input: InputBudget): Promise<unknown> {
  return input.send(() => client.command.tvRemote({ button: REMOTE_BUTTONS[key] }));
}

/** Throws `INVALID_ARGUMENT` unless `key` is one of the remote keys. */
export function requireRemoteKey(key: unknown): asserts key is RemoteKeyName {
  if (typeof key === 'string' && Object.hasOwn(REMOTE_BUTTONS, key)) return;
  throw new TestError('INVALID_ARGUMENT', `device.pressRemote(${JSON.stringify(key)}): not a remote key; press one of ${REMOTE_KEYS.join(', ')}`);
}
