import { EventEmitter } from "eventemitter3"
import { action, computed, makeObservable, observable } from "mobx"
import { THREE_LETTER_WORDS } from "./constants"
import { sampleAndRemove } from "./utils"

export type GameState = "word_spelling" | "word_complete"

export type GameEvents = {
  game_start: (game: Game) => void
  game_reset: (game: Game) => void
  change_state: (game: Game) => void
  wrong_input: (game: Game) => void
  right_input: (game: Game) => void
  start_word: (game: Game) => void
  complete_word: (game: Game) => void
}

export type UiEvent =
  | { type: "input"; key: string }
  | { type: "start_game" }
  | { type: "reset_game" }

export class Game extends EventEmitter<GameEvents> {
  constructor() {
    super()
    makeObservable(this)

    this.emit("game_start", this)
  }

  /**
   * The current game state.
   */
  state: GameState = "word_spelling"

  /**
   * The array of words.
   */
  words = [...THREE_LETTER_WORDS]

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
    this.emit("change_state", this)
  }

  /**
   * Dispatch an event to the game.
   *
   * @param event The event to dispatch.
   */
  @action dispatch(event: UiEvent) {
    switch (event.type) {
      case "input": {
        const { key } = event

        if (this.state === "word_complete") {
          this.currentIndex = 0
          this.currentWord = sampleAndRemove(this.words)
          this.setState("word_spelling")
          return
        }

        if (key.toLowerCase() === this.nextLetter) {
          this.currentIndex++
        }

        if (this.currentIndex > this.currentWord.length - 1) {
          this.setState("word_complete")
        }
      }
    }
  }
}

export const game = new Game()
