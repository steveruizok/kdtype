import * as React from 'react'
import { useGame } from './useGameContext'

export function useKeyboardInput() {
  const { game } = useGame()

  const rInput = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleNewWord = () => {
      const elm = rInput.current
      if (!elm) return
      elm.value = ''
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      game.dispatch({ type: 'input', key: e.key.toLowerCase() })
    }

    window.addEventListener('keydown', handleKeyDown)
    game.on('word_start', handleNewWord)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      game.off('word_start', handleNewWord)
    }
  }, [game])

  return rInput
}
