import { observer } from "mobx-react-lite"
import { useGame } from "~hooks/useGameContext"

export const StartScreen = observer(function StartScreen() {
  const { game } = useGame()

  return <div />
})
