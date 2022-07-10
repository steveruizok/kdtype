import { EventEmitter } from 'eventemitter3'
import { action, computed, makeObservable, observable } from 'mobx'
import { ALL_WORDS } from './constants'
import { isNotProfane, sampleAndRemove } from './utils'

export type GameState = 'word_spelling' | 'word_complete'

export type GameEvent =
  | 'game_start'
  | 'game_reset'
  | 'state_change'
  | 'input_wrong'
  | 'input_right'
  | 'word_start'
  | 'word_complete'

export type GameEvents = { [K in GameEvent]: (event: K, game: Game) => void }

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

    this.emit('game_start', 'game_start', this)
  }

  /**
   * The current game state.
   */
  state: GameState = 'word_spelling'

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
   * Set a new state.
   *
   * @param state The game state to set.
   */
  @action setState(state: GameState) {
    this.state = state
    this.emit('state_change', 'state_change', this)
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
    this.currentWord = this.getNextWord()
    this.emit('word_start', 'word_start', this)
    this.setState('word_spelling')
  }

  @action handleInput(key: string) {
    // Did the user just press the right key?
    if (key.toLowerCase() === this.nextLetter) {
      this.currentIndex++
      this.emit('input_right', 'input_right', this)
    } else {
      this.emit('input_wrong', 'input_wrong', this)
    }

    // Did the user just complete the word?
    if (this.currentIndex > this.currentWord.length - 1) {
      this.completeWord()
    }
  }

  @action completeWord() {
    this.emit('word_complete', 'word_complete', this)
    this.setState('word_complete')
  }

  @action resetGame() {
    this.words = this.getWords()
    this.currentIndex = 0
    this.currentWord = this.getNextWord()
    this.emit('game_reset', 'game_reset', this)
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
