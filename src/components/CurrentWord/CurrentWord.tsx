import * as React from "react"
import { observer } from "mobx-react-lite"
import { useGame } from "~hooks/useGameContext"

export const CurrentWord = observer(function CurrentWord() {
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

  return <div></div>
})
