import { useState } from "react";

function Card({
  name,
  spriteUrl,
  setScore,
  bestScore,
  setBestScore,
  clickedCardNames,
  setClickedCardNames,
}) {
  function cardClicked(name) {
    if (clickedCardNames.has(name)) {
      setScore(0);
      setClickedCardNames(new Set());
    } else {
      const newClickedCardNames = new Set(clickedCardNames);
      newClickedCardNames.add(name);
      setClickedCardNames(newClickedCardNames);

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
}) {
  const [clickedCardNames, setClickedCardNames] = useState(new Set());

  return (
    <section className="cards-section">
      {loading && <p className="loading-para">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && pokemons && (
        <div className="cards">
          {pokemons.map((pokemon) => (
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
              key={pokemon.name}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export { Cards };
