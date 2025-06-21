import "../assets/GameOver.css";

function GameOver({ setGameOver, setScore, setBestScore, refresh }) {
  function startNewGame() {
    setGameOver(false);
    setScore(0);
    setBestScore(0);
    refresh();
  }

  return (
    <div className="overlay">
      <div className="game-over">
        <h2>Congratulations! You won!</h2>
        <button type="button" onClick={startNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export { GameOver };
