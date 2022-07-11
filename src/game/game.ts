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

export type GameSettings = {
  casing: 'lower' | 'upper' | 'start'
  ignoreCasing: boolean
}

export type UiEvent =
  | { type: 'ui_ready' }
  | { type: 'input'; key: string }
  | { type: 'click' }
  | { type: 'animation_complete' }
  | { type: 'change_setting'; setting: Partial<GameSettings> }

export class Game extends EventEmitter<GameEvents> {
  constructor() {
    super()
    makeObservable(this)

    requestAnimationFrame(() => {
      this.emit('game_start', this)
    })
  }

  /**
   * The current game state.
   * @public
   */
  @observable state: GameState = 'game_starting'

  /**
   * The current settings.
   * @public
   */
  @observable settings: GameSettings = {
    casing: 'lower',
    ignoreCasing: true,
  }

  /**
   * The current letter index.
   * @public
   */
  @observable currentIndex = 0

  /**
   * The current word (in its cased format).
   * @public
   */
  @computed get currentWord() {
    const { _currentWord, settings } = this

    switch (settings.casing) {
      case 'lower': {
        return _currentWord.toLowerCase()
      }
      case 'upper': {
        return _currentWord.toUpperCase()
      }
      case 'start': {
        const letters = _currentWord.toLowerCase().split('')
        letters[0] = letters[0].toUpperCase()
        return letters.join('')
      }
    }
  }

  /**
   * Dispatch an event to the game.
   *
   * @param event The event to dispatch.
   * @public
   */
  @action dispatch(event: UiEvent) {
    switch (event.type) {
      case 'ui_ready': {
        this.setState('word_transitioning_in')
        break
      }
      case 'change_setting': {
        Object.assign(this.settings, event.setting)
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

  /* ------------------- Private API ------------------ */

  /**
   * The array of words.
   */
  private words = this.getWords()

  /**
   * The current word (in its raw format).
   * @private
   */
  @observable private _currentWord = this.getNextWord()

  /**
   * The next letter.
   * @public
   */
  @computed private get nextLetter() {
    return this.currentWord[this.currentIndex]
  }

  /**
   * Set a new state.
   *
   * @param state The game state to set.
   * @public
   */
  @action private setState(state: GameState) {
    this.state = state
    this.emit('state_change', this)
  }

  @action private getWords(maxLength = 3) {
    return ALL_WORDS.filter((word) => word.length <= maxLength).filter(isNotProfane)
  }

  @action private getNextWord() {
    return sampleAndRemove(this.words)
  }

  @action private unloadCurrentWord() {
    // Enter the word_starting state
    this.setState('word_transitioning_out')
  }

  @action private loadNextWord() {
    // Enter the word_starting state
    if (this.words.length === 0) {
      // If we've somehow ran out of words, reset the game instead
      this.resetGame()
      return
    }

    this.currentIndex = 0
    this._currentWord = this.getNextWord()
    this.emit('word_start', this)
    this.setState('word_spelling')
    this.setState('word_transitioning_in')
  }

  @action private handleLetterInput(key: string) {
    const { ignoreCasing } = this.settings

    // Did the user just press the right key?
    const isRight = ignoreCasing
      ? key.toLowerCase() === this.nextLetter.toLowerCase()
      : key === this.nextLetter

    if (isRight) {
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

  @action private completeWord() {
    this.emit('word_complete', this)
    this.setState('word_complete')
  }

  @action private resetGame() {
    this.words = this.getWords()
    this.currentIndex = 0
    this._currentWord = this.getNextWord()
    this.emit('game_reset', this)
    this.setState('word_spelling')
  }
}

export const game = new Game()
