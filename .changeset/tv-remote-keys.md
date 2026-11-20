---
'@e2e-dev/core': patch
'e2e': patch
'@e2e-dev/mobile': patch
'@e2e-dev/web': patch
---

`press` and the agent's `pressKey` take TV remote keys: `menu`, `home`, `play`, `pause`, `play-pause`, `stop`, `rewind`, `fast-forward`, `next`, and `previous`. They are lowercase, so `home` is the remote's Home button and `Home` stays the keyboard key. The mobile engine presses them through agent-device's `tv-remote`, and the replay cache records and replays them like any other key. A device without that button fails with `UNSUPPORTED_CAPABILITY`, and so does the web engine, which has no remote. `REMOTE_KEY_NAMES` is exported from `e2e/engine`.
