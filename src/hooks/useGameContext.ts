import React from 'react'
import { Game } from '~game'

export type GameContext = {
  game: Game
}

export const gameContext = React.createContext({} as GameContext)

export function useGameContextHelper() {
  const [context] = React.useState<GameContext>(() => ({ game: new Game() }))
  return context
}

export function useGame() {
  return React.useContext(gameContext)
}
