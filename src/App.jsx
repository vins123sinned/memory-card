import { useState } from "react";
import { Scoreboard } from "./components/Scoreboard.jsx";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  return (
    <>
      <header>
        <div className="header-text">
          <h1>Pokémon Memory Game</h1>
          <p>Try to click every card only ONCE to win the game!</p>
        </div>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>
    </>
  );
}

export default App;
