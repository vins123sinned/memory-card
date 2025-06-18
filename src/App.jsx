import { useEffect, useState } from "react";
import { Scoreboard } from "./components/Scoreboard.jsx";
import { Cards } from "./components/Cards.jsx";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const { pokemons, loading, error } = usePokemonData();

  return (
    <>
      <header>
        <div className="header-text">
          <h1>Pokémon Memory Game</h1>
          <p>Try to click every card only ONCE to win the game!</p>
        </div>
        <Scoreboard score={score} bestScore={bestScore} />
      </header>
      <Cards
        setScore={setScore}
        setBestScore={setBestScore}
        pokemons={pokemons}
        loading={loading}
        error={error}
      />
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
  }, []);

  return { pokemons, loading, error };
}

export default App;
