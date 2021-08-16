/*
    Pokemon max and min stat formulas: x = base_stat
    max => HP = 2x + 110
    max others => 2x + 5
    min => 
    min others => 
*/

// let searchable = [
//   'Pikachu',
//   'Charizard', 
//   'Snorlax',
//   'Eevee',
//   'Mew'
// ];

// const searchInput = document.getElementById('search');
// const searchWrapper = document.querySelector('.wrapper');
// const resultsWrapper = document.querySelector('.results');

// searchInput.addEventListener('keyup', (e) => {
//   console.log(e.target.value);
//   let results = [];
//   let input = searchInput.value;
//   if(input.length) {
//     results = searchable.filter((item) => {
//       return item.toLowerCase().includes(input.toLowerCase())
//     })
//   }
//   renderResults(results);
// });

// function renderResults(results) {
//   if(!results.length) {
//     return searchWrapper.classList.remove('show');
//   }
//   const content = results.map((item) => {
//     return `<li><a href="#">${item}</a></li>`
//   })
//   .join('');

//   console.log(content);

//   searchWrapper.classList.add('show');
//   resultsWrapper.innerHTML = `<ul>${content}</ul>`;
// }

const url = "https://pokeapi.co/api/v2/pokemon/";
let pokemonName = "";
// min stat variables
let min_hp = "";
let min_atk = "";
let min_def = "";
let min_spd = "";
let min_exp = "";
// max stat variables
let max_hp = "";
let max_atk = "";
let max_def = "";
let max_spd = "";
let max_exp = "";

// pokemon color according to type
let bg_color = "";
let type_color = "";
let progress_bar_color = "";

$(".spinner").hide();
$(".pokemon-placeholder").hide();
$(".invalid-placeholder").html(`
   <div>Enter a Pokemon's name in the search bar!</div>    
   `);

$("#search-button").click(function (e) {
  e.preventDefault();
  $(".pokemon-placeholder").show();
  $(".pokemon-placeholder").html("");
  $(".spinner").show();
  pokemonName = $("#searchInput").val().toLowerCase();

  $.get(url + pokemonName)
    .done(function (data, textStatus, jqXHR) {
      // base stat vars
      let base_hp = "${data.stats[0].base_stat}";
      let base_atk = "";
      let base_def = "";
      let base_spd = "";
      let base_exp = "";

      if (data.types[0].type.name === "fire") {
        bg_color = "#FDDFDF";
        type_color = "#d6350c";
      }
      if (data.types[0].type.name === "grass") {
        bg_color = "#DEFDE0";
        type_color = "#89E78F";
      }
      if (data.types[0].type.name === "electric") {
        bg_color = "#FAE182";
        type_color = "#EFDB17";
      }
      if (data.types[0].type.name === "water") {
        bg_color = "#36AFF6";
        type_color = "#0A7ABC";
      }
      if (data.types[0].type.name === "ground") {
        bg_color = "#f4e7da";
        type_color = "#E78320";
      }
      if (data.types[0].type.name === "rock") {
        bg_color = "#d5d5d4";
        type_color = "#A1A150";
      }
      if (data.types[0].type.name === "fairy") {
        bg_color = "#fceaff";
        type_color = "#F8AEC9";
      }
      if (data.types[0].type.name === "poison") {
        bg_color = "#C68CC6";
        type_color = "#7C017C";
      }
      if (data.types[0].type.name === "bug") {
        bg_color = "#CAD479";
        type_color = "#62960E";
      }
      if (data.types[0].type.name === "dragon") {
        bg_color = "#97b3e6";
        type_color = "#6179A4";
      }
      if (data.types[0].type.name === "psychic") {
        bg_color = "#FCB6D0";
        type_color = "#F55792";
      }
      if (data.types[0].type.name === "flying") {
        bg_color = "#F5F5F5";
        type_color = "#C4C4C4";
      }
      if (data.types[0].type.name === "fighting") {
        bg_color = "#D9827E";
        type_color = "#800B11";
      }
      if (data.types[0].type.name === "normal") {
        bg_color = "#CCC9AA";
        type_color = "#ACA974";
      }
      if (data.types[0].type.name === "ghost") {
        bg_color = "#CEB6C3";
        type_color = "#96617D";
      }
      if (data.types[0].type.name === "ice") {
        bg_color = "#AFDDF3";
        type_color = "#81C0DF";
      }
      if (data.types[0].type.name === "dark") {
        bg_color = "#9D806C";
        type_color = "#593D29";
      }
      if (data.types[0].type.name === "steel") {
        bg_color = "#B8B8D0";
        type_color = "#DFDFE9";
      }

      $(".spinner").hide();
      $(".invalid-placeholder").hide();
      $(".pokemon-placeholder").html(`
        
      <div class="pokemon" style="background-color:${bg_color}";>
      <div class="pokemon-image-bg">
        <div class="top-header">
          <div class="pokemon-name">${data.species.name.toUpperCase()}</div>
          <div class="pokemon-id">#${data.id}</div>
        </div>
        <img class="pokemon-image" src="${
          data.sprites.other.dream_world.front_default
        }" alt="">
      </div>
       <div class="type">
         <div class="type-header" style="background-color:${type_color}";>&nbsp ${data.types[0].type.name.toUpperCase()} &nbsp</div>
       </div>
       <div class="hw">
        <div class="height-header">Height: &nbsp ${
          data.height
        }' &nbsp | &nbsp </div>
        <div class="height-header">Weight: &nbsp ${data.weight}lbs.</div>
      </div>
      <div class="base-stats">Base Stats</div>

        <div class="stats-container">
          <p class="ranges">min: 50 &nbsp max: ${
            data.stats[0].base_stat * 2 + 110
          }</p>
            <div class="progress-bars">
              <p class="attribute">HP |  ${data.stats[0].base_stat}</p>
              <progress class="${
                data.types[0].type.name
              }" value="${data.stats[0].base_stat}" max="500">min: 50 max: "${data.stats[0].base_stat * 2 + 110}" </progress>
            </div>
            <p class="ranges">min: 50 &nbsp max: ${
              data.stats[1].base_stat * 2 + 5
            }</p>
            <div class="progress-bars">
              <p class="attribute">ATK |  ${data.stats[1].base_stat}</p>
              <progress class="${
                data.types[0].type.name
              }" value="${data.stats[1].base_stat}" max="${data.stats[1].base_stat * 2 + 5}"></progress>
            </div>
            <p class="ranges">min: 50 &nbsp max: ${
              data.stats[2].base_stat * 2 + 5
            }</p>
            <div class="progress-bars">
              <p class="attribute">DEF |  ${data.stats[2].base_stat}</p>
              <progress class="${
                data.types[0].type.name
              }" value="${data.stats[2].base_stat}" max="${data.stats[2].base_stat * 2 + 5}"></progress>
            </div>
            <p class="ranges">min: 50 &nbsp max: ${
              data.stats[5].base_stat * 2 + 5
            }</p>
            <div class="progress-bars">
              <p class="attribute">SPD |  ${data.stats[5].base_stat}</p>
              <progress class="${
                data.types[0].type.name
              }" value="${data.stats[5].base_stat}" max="${data.stats[5].base_stat * 2 + 5}"></progress>
            </div>
            <p class="ranges">min: 36 &nbsp max: 608</p>
            <div class="progress-bars">
              <p class="attribute">EXP |  ${data.base_experience}</p>
              <progress class="${
                data.types[0].type.name
              }" value="${data.base_experience}" max="608"></progress>
            </div>
        </div>
    </div>
    `);
    })

    .fail(function (jqXHR, textStatus, errorThrown) {
      $(".spinner").hide();
      $(".invalid-placeholder").show();
      $(".invalid-placeholder").html(`
             <div>Invalid Pokemon entered.</div>    
         `);
    });
});