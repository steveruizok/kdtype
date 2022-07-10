import { EventEmitter } from 'eventemitter3'
import { action, computed, makeObservable, observable } from 'mobx'
import { ALL_WORDS, GAME_EVENTS } from './constants'
import { isNotProfane, sampleAndRemove } from './utils'

export type GameState =
  | 'game_starting'
  | 'word_transitioning_out'
  | 'word_transitioning_in'
  | 'word_spelling'
  | 'word_complete'

export type GameEvent = typeof GAME_EVENTS[number]

export type GameEvents = { [K in GameEvent]: (game: Game) => void }

export type UiEvent =
  | { type: 'input'; key: string }
  | { type: 'click' }
  | { type: 'game_start' }
  | { type: 'game_reset' }
  | { type: 'animation_complete' }

export class Game extends EventEmitter<GameEvents> {
  constructor() {
    super()
    makeObservable(this)

    requestAnimationFrame(() => this.emit('game_start', this))
  }

  /**
   * The array of words.
   */
  words = this.getWords()

  /**
   * The current word.
   */
  @observable currentWord = this.getNextWord()

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
   * The current game state.
   */
  @observable state: GameState = 'game_starting'

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
            this.unloadCurrentWord()
            break
          }
        }
        break
      }
      case 'animation_complete': {
        switch (this.state) {
          case 'word_transitioning_out': {
            this.loadNextWord()
            break
          }
          case 'word_transitioning_in': {
            this.setState('word_spelling')
            break
          }
        }
        break
      }
      case 'input': {
        switch (this.state) {
          case 'word_complete': {
            this.unloadCurrentWord()
            break
          }
          case 'word_spelling': {
            this.handleLetterInput(event.key)
            break
          }
        }
        break
      }
    }
  }

  @action unloadCurrentWord() {
    // Enter the word_starting state
    this.setState('word_transitioning_out')
  }

  @action loadNextWord() {
    // Enter the word_starting state
    if (this.words.length === 0) {
      // If we've somehow ran out of words, reset the game instead
      this.resetGame()
      return
    }

    this.currentIndex = 0
    this.currentWord = this.getNextWord()
    this.emit('word_start', this)
    this.setState('word_spelling')
    this.setState('word_transitioning_in')
  }

  @action handleLetterInput(key: string) {
    // Did the user just press the right key?
    if (key.toLowerCase() === this.nextLetter) {
      this.currentIndex++
      this.emit('input_right', this)
    } else {
      this.emit('input_wrong', this)
    }

    // Did the user just complete the word?
    if (this.currentIndex > this.currentWord.length - 1) {
      this.completeWord()
    }
  }

  @action completeWord() {
    this.emit('word_complete', this)
    this.setState('word_complete')
  }

  @action resetGame() {
    this.words = this.getWords()
    this.currentIndex = 0
    this.currentWord = this.getNextWord()
    this.emit('game_reset', this)
    this.setState('word_spelling')
  }

  @action getWords(maxLength = 3) {
    return ALL_WORDS.filter((word) => word.length <= maxLength).filter(isNotProfane)
  }

  @action getNextWord() {
    return sampleAndRemove(this.words)
  }
}

export const game = new Game()
