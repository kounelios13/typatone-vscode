# typatone-vscode

A Visual Studio Code extension that creates sweet melodies based on what you type. Inspired by [typatone](https://typatone.com)

## Installation

Run `code --install-extension smo.typatone-vscode`

or search [typatone-vscode](https://marketplace.visualstudio.com/items?itemName=smo.typatone-vscode) in Extensions Marketplace.

## How to use

Typatone will start immediately when vs code is started. However, you can enable and disable the extension by executing these commands in the Command Palette (Cmd+Shift+P).

- `Typatone: Enable`
- `Typatone: Disable`

You can choose different themes by typing `Typatone: Choose theme`

- Natural (default)
- Beeps
- Boards
- Flutter
- Spooky

It's also possible to customize typatone-vscode experience in `Typatone: Settings`

- Tempo mode: by default, typatone-vscode uses a predefined tempo for each theme, it is possible to deactivate the tempo and code in free mode
- Loop: loop the sequence in tempo mode (max: 3 times)

## Platform requirements

### Linux
Audio playback relies on an external MP3-capable player. Install one of the following before enabling the extension:

```bash
sudo apt install mpg123      # recommended (lightweight)
# or
sudo apt install mplayer
# or
sudo apt install sox          # provides the `play` command
# or
sudo apt install vlc          # provides `cvlc`
```

> **Note:** `aplay` (included with most Linux distributions) only handles raw PCM/WAV audio. Using it to play MP3 files produces garbled noise. The extension automatically skips `aplay` and uses one of the MP3-capable players listed above instead.

### macOS / Windows
No additional software is required.

## Issues
Tested primarily on macOS, feel free to contribute.

---

**Enjoy!**
