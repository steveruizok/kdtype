import THREE_LETTER_WORDS from './words/three-letter-words.json'
import FOUR_LETTER_WORDS from './words/four-letter-words.json'
import FIVE_LETTER_WORDS from './words/five-letter-words.json'
import SIX_LETTER_WORDS from './words/six-letter-words.json'

export const GAME_EVENTS = [
  'game_start',
  'game_reset',
  'state_change',
  'input_wrong',
  'input_right',
  'word_start',
  'word_complete',
] as const

export const ALL_WORDS = [
  ...THREE_LETTER_WORDS,
  ...FOUR_LETTER_WORDS,
  ...FIVE_LETTER_WORDS,
  ...SIX_LETTER_WORDS,
].map((word) => word.toLowerCase())

/**
 * A mapping of game events to Audio elements used to play sound effects.
 * To create a new sound effect, create a new file in public/audio.
 */
export const EVENT_SOUNDS: Record<typeof GAME_EVENTS[number], HTMLAudioElement | null> = {
  game_start: null,
  game_reset: null,
  state_change: null,
  input_wrong: null,
  input_right: new Audio(`audio/input_right.mp3`),
  word_start: null,
  word_complete: new Audio(`audio/word_complete.mp3`),
}
