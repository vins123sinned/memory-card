import { useCallback, useEffect, useState } from "react";
import { Scoreboard } from "./components/Scoreboard.jsx";
import { Cards } from "./components/Cards.jsx";
import { GameOver } from "./components/GameOver.jsx";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const { pokemons, loading, error, refresh } = usePokemonData();

  return (
    <>
      <header>
        <div className="header-text">
          <h1>Pokémon Memory Game</h1>
          <p>Try to click every card only ONCE to win the game!</p>
        </div>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>
      {!gameOver && (
        <Cards
          setScore={setScore}
          bestScore={bestScore}
          setBestScore={setBestScore}
          pokemons={pokemons}
          loading={loading}
          error={error}
          setGameOver={setGameOver}
        />
      )}
      {gameOver && (
        // Add game over mechanics later!
        <GameOver
          setGameOver={setGameOver}
          setScore={setScore}
          setBestScore={setBestScore}
          refresh={refresh}
        />
      )}
    </>
  );
}

function getRandomIds(amount, limit) {
  const ids = new Set();

  // Set will prevent duplicate ids on the off chance it happens
  while (ids.size < amount) {
    const id = Math.floor(Math.random() * limit);
    ids.add(id);
  }

  return Array.from(ids);
}

function usePokemonData() {
  const [pokemons, setPokemons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = useCallback(() => {
    setRefreshIndex((r) => r + 1);
  }, []);

  useEffect(() => {
    const ids = getRandomIds(12, 1025);
    if (!ids) return;

    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        const requests = ids.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) =>
            res.json(),
          ),
        );
        const results = await Promise.all(requests);

        if (!ignore) setPokemons(results);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [refreshIndex]);

  return { pokemons, loading, error, refresh };
}

export default App;
