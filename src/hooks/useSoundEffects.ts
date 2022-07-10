import React from 'react'
import { GameEvent } from '~game'
import { useGame } from './useGameContext'
import { EVENT_SOUNDS, GAME_EVENTS } from '~game/constants'

/**
 * A hook that sets a listener on each game event that will, when the
 * event occurs, try to play the sound effect for that event, using the
 * mapping of game events to sound effects defined in `EVENT_SOUNDS`.
 */
export function useSoundEffects() {
  const { game } = useGame()

  React.useEffect(() => {
    function handleEvent(event: GameEvent) {
      const elm = EVENT_SOUNDS[event]
      if (!elm) return

      elm.pause()
      elm.currentTime = 0
      elm.play()
    }

    const unsubs = GAME_EVENTS.map((eventName) => {
      const ev = () => handleEvent(eventName)
      game.on(eventName, ev)
      return () => game.off(eventName, ev)
    })

    return () => {
      unsubs.forEach((unsub) => unsub())
    }
  }, [])
}
