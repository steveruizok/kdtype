import * as React from "react"
import { observer } from "mobx-react-lite"
import { useGame } from "~hooks/useGameContext"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"

export const GameScreen = observer(function GameScreen() {
  const { game } = useGame()

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      game.dispatch({ type: "input", key: e.key.toLowerCase() })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [game])

  const { width, height } = useWindowSize()

  return (
    <div
      className="screen"
      onPointerDown={() => {
        game.dispatch({ type: "click" })
      }}
    >
      <div className="currentword">
        <input className="input" autoFocus />
        {game.currentWord.split("").map((letter, i) => (
          <span
            key={i}
            data-status={
              game.state === "word_complete"
                ? "celebrate"
                : i === game.currentIndex
                ? "current"
                : i < game.currentIndex
                ? "celebrate"
                : false
            }
          >
            {letter}
          </span>
        ))}
      </div>
      <Confetti
        width={width}
        height={height}
        recycle={game.state === "word_complete"}
      />
    </div>
  )
})
