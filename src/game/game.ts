import { EventEmitter } from 'eventemitter3'
import { action, computed, makeObservable, observable } from 'mobx'
import { THREE_LETTER_WORDS } from './constants'
import { sampleAndRemove } from './utils'
import inputAudio from '/audio/input_right.mp3'
import celebrateAudio from '/audio/word_complete.mp3'

export type GameState = 'word_spelling' | 'word_complete'

export type GameEvents = {
  game_start: (game: Game) => void
  game_reset: (game: Game) => void
  state_change: (game: Game) => void
  input_wrong: (game: Game) => void
  input_right: (game: Game) => void
  word_start: (game: Game) => void
  word_complete: (game: Game) => void
}

export type UiEvent =
  | { type: 'input'; key: string }
  | { type: 'click' }
  | { type: 'game_start' }
  | { type: 'game_reset' }

export type GameAudio = 'input_right' | 'word_complete'

export class Game extends EventEmitter<GameEvents> {
  constructor() {
    super()
    makeObservable(this)

    this.emit('game_start', this)
  }

  /**
   * The current game state.
   */
  state: GameState = 'word_spelling'

  /**
   * The array of words.
   */
  words = [...THREE_LETTER_WORDS]

  /**
   * The games audio effects.
   */
  audio = {
    input_right: new Audio(inputAudio),
    word_complete: new Audio(celebrateAudio),
  }
  /**
   * The current word.
   */
  @observable currentWord = sampleAndRemove(this.words)

  /**
   * The current letter index.
   */
  @observable currentIndex = 0

  /**
   * The next letter.
   */
  @computed get nextLetter() {
    return this.currentWord[this.currentIndex].toLowerCase()
  }

  /**
   * Set a new state.
   *
   * @param state The game state to set.
   */
  @action setState(state: GameState) {
    this.state = state
    this.emit('state_change', this)
  }

  /**
   * Dispatch an event to the game.
   *
   * @param event The event to dispatch.
   */
  @action dispatch(event: UiEvent) {
    switch (event.type) {
      case 'game_reset': {
        this.resetGame()
        break
      }
      case 'click': {
        switch (this.state) {
          case 'word_complete': {
            this.startWord()
            break
          }
        }
        break
      }
      case 'input': {
        switch (this.state) {
          case 'word_complete': {
            this.startWord()
            break
          }
          case 'word_spelling': {
            this.handleInput(event.key)
            break
          }
        }
        break
      }
    }
  }

  @action startWord() {
    if (this.words.length === 0) {
      // If we've somehow ran out of words, reset the game instead
      this.resetGame()
      return
    }

    this.currentIndex = 0
    this.currentWord = sampleAndRemove(this.words)
    this.emit('word_start', this)
    this.setState('word_spelling')
  }

  @action handleInput(key: string) {
    // Did the user just press the right key?
    if (key.toLowerCase() === this.nextLetter) {
      this.currentIndex++
      this.playAudio('input_right')
      this.emit('input_right', this)
    } else {
      this.emit('input_wrong', this)
    }

    // Did the user just complete the word?
    if (this.currentIndex > this.currentWord.length - 1) {
      this.playAudio('word_complete')
      this.completeWord()
    }
  }

  @action completeWord() {
    this.emit('word_complete', this)
    this.setState('word_complete')
  }

  @action resetGame() {
    this.words = [...THREE_LETTER_WORDS]
    this.currentIndex = 0
    this.currentWord = sampleAndRemove(this.words)
    this.emit('game_reset', this)
    this.setState('word_spelling')
  }

  @action playAudio(key: GameAudio) {
    this.audio[key].load()
    this.audio[key].play()
  }
}

export const game = new Game()
