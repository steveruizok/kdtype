import "./App.css"
import { CurrentWord } from "~components/CurrentWord"
import { gameContext, useGameContextHelper } from "~hooks/useGameContext"

function App() {
  const game = useGameContextHelper()

  return (
    <gameContext.Provider value={game}>
      <div className="App">
        <CurrentWord />
      </div>
    </gameContext.Provider>
  )
}

export default App
