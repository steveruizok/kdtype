import * as React from "react"
import { observer } from "mobx-react-lite"
import { useGame } from "~hooks/useGameContext"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"

export const GameScreen = observer(function GameScreen() {
  const { game } = useGame()

  const rInput = React.useRef<HTMLInputElement>(null)

  const [start, setStart] = React.useState(false)

  React.useEffect(() => {
    const handleFirstStart = () => {
      setStart(true)
    }

    const handleNewWord = () => {
      const elm = rInput.current
      if (!elm) return
      elm.value = ""
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      game.dispatch({ type: "input", key: e.key.toLowerCase() })
    }

    window.addEventListener("keydown", handleKeyDown)
    game.once("word_complete", handleFirstStart)
    game.on("word_start", handleNewWord)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      game.off("word_complete", handleFirstStart)
      game.off("word_start", handleNewWord)
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
        <input ref={rInput} className="input" autoFocus />
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
        run={start}
      />
    </div>
  )
})
