import { GameScreen } from "~components/GameScreen"
import { gameContext, useGameContextHelper } from "~hooks/useGameContext"

function App() {
  const game = useGameContextHelper()

  return (
    <gameContext.Provider value={game}>
      <div className="App">
        <GameScreen />
      </div>
    </gameContext.Provider>
  )
}

export default App
