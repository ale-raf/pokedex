// import { globalPokedex } from "./data.js";
const searchResult = document.querySelector(".pokedex-container");
const form = document.querySelector(".form");
const searchInput = document.getElementById("search");

let globalPokedex;

async function catchAllPokemons() {
  const res = await fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon");
  const pokedex = await res.json();
  globalPokedex = randomizePokedex(pokedex);
  createPokemonCard(pokedex);
}

catchAllPokemons();

function randomizePokedex(pokedex) {
  const randomPokedex = pokedex.sort((a, b) => 0.5 - Math.random());
  return randomPokedex;
}

function createPokemonCard(pokedex) {
  pokedex.forEach((pokemon) => {
    if (pokemon.pokedexId > 0) {
      const pokemonCard = document.createElement("article");
      pokemonCard.classList.add("card-wrapper");
      pokemonCard.innerHTML = `<h3 class="title-card">${pokemon.name.fr}</h3>
      <img src=${pokemon.sprites.regular} alt="image de ${pokemon.name.fr}">`;
      searchResult.appendChild(pokemonCard);

      showPokemonTalents(pokemon, pokemonCard);
    }
  });
}

function showPokemonTalents(pokemon, card) {
  const talentsList = document.createElement("ul");
  pokemon.talents.forEach((talent) => {
    const talentName = document.createElement("li");
    talentName.innerHTML = talent.name;
    talentsList.classList.add("talents");
    card.appendChild(talentsList);
    talentsList.appendChild(talentName);
  });
}

searchInput.addEventListener("input", catchSomePokemons);

function catchSomePokemons(e) {
  searchResult.innerHTML = "";
  const searchPokemon = e.target.value.toLowerCase();
  const filteredPokedex = globalPokedex.filter((pokemon) =>
    pokemon.name.fr.toLowerCase().includes(searchPokemon)
  );
  createPokemonCard(filteredPokedex);
}

form.addEventListener("submit", findPokemon);

function findPokemon(e) {
  e.preventDefault();
  searchResult.innerHTML = "";
  const searchPokemon = searchInput.value.toLowerCase();
  const filteredPokedex = globalPokedex.filter((pokemon) =>
    pokemon.name.fr.toLowerCase().includes(searchPokemon)
  );
  createPokemonCard(filteredPokedex);
}
