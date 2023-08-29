const pokemonName = document.querySelector(".title-card");
const pokemonImg = document.querySelector(".image");
const talentsList = document.querySelector(".talents");
fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon/tortank").then(
  (res) => {
    if (res.ok) {
      res.json().then((data) => {
        pokemonName.innerHTML = data.name.fr;
        pokemonImg.src = data.sprites.regular;
        pokemonImg.alt = data.name.fr;
        console.log(document.querySelector(".image"));
        data.talents.filter((talent) => {
          const talentName = document.createElement("li");
          talentName.innerHTML = talent.name;
          talentsList.appendChild(talentName);
        });
      });
    } else {
      console.log("error");
    }
  }
);
