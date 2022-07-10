import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useGame } from '~hooks/useGameContext'
import { useSoundEffects } from '~hooks/useSoundEffects'
import { Celebration } from '~components/Celebration'
import { CurrentWord } from '~components/CurrentWord'

export const GameScreen = observer(function GameScreen() {
  const { game } = useGame()

  useSoundEffects()

  const handlePointerDown = React.useCallback(() => {
    game.dispatch({ type: 'click' })
  }, [game])

  // Temporary... after a pause, start the first word
  React.useEffect(() => {
    if (game.state === 'game_starting') {
      setTimeout(() => {
        game.setState('word_transitioning_in')
      }, 750)
    }
  }, [game.state])

  return (
    <div className="game" data-state={game.state} onPointerDown={handlePointerDown}>
      <CurrentWord />
      <Celebration />
    </div>
  )
})
