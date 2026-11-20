---
'@e2e-dev/core': patch
'e2e': patch
'@e2e-dev/mobile': patch
'@e2e-dev/web': patch
---

`press` and an executor's `pressKey` take TV remote keys: the D-pad (`up`, `down`, `left`, `right`, `select`), `back`, `menu`, `home`, and the media keys `play`, `pause`, `play-pause`, `stop`, `rewind`, `fast-forward`, `next`, and `previous`. They are lowercase, so `home` is the remote's Home button and `Home` stays the keyboard key. `REMOTE_KEY_NAMES` lists them, exported from `e2e/engine`.

The mobile engine presses them through agent-device's `tv-remote`, and the replay cache records and replays them like any other key. `device.pressRemote(key)` presses one with no node to address. On a device without that button, and on the web engine, which has no remote, the press rejects with `UNSUPPORTED_CAPABILITY`; a refused keyboard key names the remote key to press instead, and the reverse on the web. An executor that lets that error escape `runStep` fails `agent.act` with `POLICY_DENIED`, the original error as its `cause`, so catch it around `pressKey` to fall back.

On an iOS or Android target the built-in agent's press tools name the remote keys, and a remote `home` is no longer read as the keyboard key that only moves focus.

An engine that passes keys through to its platform now receives remote keys too: check `parseKey(key)?.key.kind === 'remote'` and refuse them with `UNSUPPORTED_CAPABILITY`.
