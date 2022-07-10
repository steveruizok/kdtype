import * as React from 'react'
import { useGame } from './useGameContext'

export function useConfetti() {
  const [start, setStart] = React.useState(false)

  const { game } = useGame()

  React.useEffect(() => {
    const handleFirstStart = () => {
      setStart(true)
    }

    game.once('word_complete', handleFirstStart)

    return () => {
      game.off('word_complete', handleFirstStart)
    }
  }, [game])

  return {
    run: start,
    recycle: game.state === 'word_complete',
  }
}
