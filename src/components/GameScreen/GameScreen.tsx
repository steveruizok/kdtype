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
    <div className="screen">
      <div className="currentword">
        {game.currentWord.split("").map((letter, i) => (
          <span
            key={i}
            data-status={
              i === game.currentIndex
                ? "current"
                : i < game.currentIndex
                ? "complete"
                : false
            }
          >
            {letter}
          </span>
        ))}
      </div>
      {game.state === "word_complete" && (
        <Confetti width={width} height={height} />
      )}
    </div>
  )
})
