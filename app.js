const container = document.querySelector(".pokedex-container");
const search = document.getElementById("search");
let pokedex;

function catchAllPokemons() {
  fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon").then((res) => {
    if (res.ok) {
      res.json().then(createPokemonCard);
    } else {
      console.log("error");
    }
  });
}

function createPokemonCard(pokedex) {
  const randomPokedex = pokedex.sort((a, b) => 0.5 - Math.random());
  for (let pokemon of randomPokedex) {
    if (pokemon.pokedexId > 0) {
      const pokemonCard = document.createElement("article");
      const pokemonName = document.createElement("h3");
      const pokemonImg = document.createElement("img");

      pokemonCard.classList.add("card-wrapper");
      pokemonName.innerHTML = pokemon.name.fr;
      pokemonName.classList.add("title-card");
      pokemonImg.src = pokemon.sprites.regular;
      pokemonImg.alt = `image de ${pokemon.name.fr}`;
      container.appendChild(pokemonCard);
      pokemonCard.append(pokemonName, pokemonImg);

      showPokemonTalents(pokemon, pokemonCard);
    }
  }
}

function showPokemonTalents(pokemon, card) {
  pokemon.talents.filter((talent) => {
    const talentsList = document.createElement("ul");
    const talentName = document.createElement("li");
    talentName.innerHTML = talent.name;
    talentsList.classList.add("talents");
    card.appendChild(talentsList);
    talentsList.appendChild(talentName);
  });
}

search.addEventListener("keyup", catchSomePokemons);
// pokedex = ["Pikachu", "Yuyu"];
function catchSomePokemons(e) {
  const value = e.target.value.toLowerCase();
  const filter = pokedex.filter((pokemon) =>
    pokemon.toLowerCase().includes(value)
  );
  console.log(filter);
}

catchAllPokemons();
