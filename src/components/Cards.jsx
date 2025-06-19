import { useEffect, useState } from "react";

function Card({
  name,
  spriteUrl,
  setScore,
  bestScore,
  setBestScore,
  clickedCardNames,
  setClickedCardNames,
  setGameOver,
}) {
  function cardClicked(name) {
    if (clickedCardNames.has(name)) {
      setScore(0);
      setClickedCardNames(new Set());
    } else {
      const newClickedCardNames = new Set(clickedCardNames);
      newClickedCardNames.add(name);
      setClickedCardNames(newClickedCardNames);

      // check if game over
      if (newClickedCardNames.size === 12) setGameOver(true);

      setScore((s) => {
        const newScore = (s += 1);
        if (newScore > bestScore) setBestScore(newScore);
        return newScore;
      });
    }
  }

  return (
    <div className="card" onClick={() => cardClicked(name)}>
      <img src={spriteUrl} alt="" height="100" />
      <p>{name}</p>
    </div>
  );
}

function Cards({
  setScore,
  bestScore,
  setBestScore,
  pokemons,
  loading,
  error,
  setGameOver,
}) {
  const [clickedCardNames, setClickedCardNames] = useState(new Set());
  const [shuffledPokemons, setShuffledPokemons] = useState([]);

  useEffect(() => {
    if (!pokemons) return;

    function shufflePokemons(array) {
      const newArray = [...array];

      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }

      return newArray;
    }

    setShuffledPokemons(shufflePokemons(pokemons));
  }, [pokemons, clickedCardNames]);

  return (
    <section className="cards-section">
      {loading && <p className="loading-para">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && pokemons && (
        <div className="cards">
          {shuffledPokemons.map((pokemon) => (
            <Card
              name={pokemon.name}
              spriteUrl={
                pokemon.sprites.other["official-artwork"]["front_default"]
              }
              setScore={setScore}
              bestScore={bestScore}
              setBestScore={setBestScore}
              clickedCardNames={clickedCardNames}
              setClickedCardNames={setClickedCardNames}
              setGameOver={setGameOver}
              key={pokemon.name}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export { Cards };
