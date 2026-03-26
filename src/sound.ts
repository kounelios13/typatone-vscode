import { ExtensionContext } from 'vscode'
import * as vscode from 'vscode'
import symbolPattern from './patterns/all'
import letterPattern from './patterns/freqTable'

// On Linux, `aplay` (ALSA) only handles raw PCM/WAV audio, not MP3.
// Using it to play MP3 files produces garbled noise. Restrict the candidate
// player list to programs that actually support MP3.
const playerOptions =
  process.platform === 'linux'
    ? { players: ['mplayer', 'mpg123', 'mpg321', 'play', 'cvlc'] }
    : {}
const player = require('play-sound')(playerOptions)

let theme: Theme = 'natural'
let playQueue: any[] = []
let context: ExtensionContext
let audioErrorShown = false

export const init = (ctx: ExtensionContext) => {
  context = ctx
  setTheme(context.globalState.get('typatone.theme', 'natural'))
}
export const setTheme = (t: Theme) => {
  theme = t
  context.globalState.update('typatone.theme', t)
}

export const getTheme = () => theme

export const themes = [
  'natural',
  'beeps',
  'boards',
  'flutter',
  'spooky',
] as const

export type Theme = typeof themes[number]

export const play = (sound: string, t: Theme = theme) => {
  const filePath = `${__dirname}/../audio/${t}/${sound}.mp3`

  playQueue.push(
    player.play(filePath, (err: any) => {
      if (err && !err.killed) {
        console.error(err)
        if (!audioErrorShown) {
          audioErrorShown = true
          const msg =
            process.platform === 'linux'
              ? 'Typatone: No MP3-capable audio player found. Install one and restart VS Code (e.g. `sudo apt install mpg123`).'
              : 'Typatone: Failed to play audio. Check the developer console for details.'
          vscode.window.showErrorMessage(msg)
        }
      }
    })
  )
}

export const stop = () => {
  playQueue.forEach((p) => p.kill())
  playQueue = []
}

export const getSoundKey = (v: string) => {
  const charIndex = symbolPattern.findIndex((item) => item === v)
  const letter = letterPattern[charIndex]

  if (['.', '{}', '[]', '()', '""'].includes(v)) {
    return 'punctuation'
  }
  // Sync symbol to letter sound
  if (letter) {
    return letter || 'i'
  }

  if (/\s/i.test(v)) {
    return 'space'
  }

  if (v.length === 0) {
    return 'backspace'
  }

  return v
}
