import { useState } from "react";

function Cards({ setScore, setBestScore, pokemons, loading, error }) {
  const [clickedCards, setClickedCards] = useState([]);

  return (
    <section className="cards-section">
      {loading && <p className="loading-para">Loading...</p>}
      {!loading && pokemons && (
        <div className="cards">
          {pokemons.map((pokemon) => {
            return (
              <div className="pokemon" key={pokemon.id}>
                <p>{pokemon.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export { Cards };
