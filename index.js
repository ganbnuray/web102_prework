/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  let times = games.length;
  for (let i = 0; i < times; i++) {
    // create a new div element, which will become the game card
    let new_element = document.createElement("div");
    // add the class game-card to the list
    new_element.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    new_element.innerHTML = `<p> Name: ${games[i]["name"]}</p> 
        <p>Description: ${games[i]["description"]}</p>
        <img class = "game-img" src="${games[i]["img"]}") >
        `;

    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")

    // append the game to the games-container
    gamesContainer.append(new_element);
  }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */
// const totalcontributions = games_JSON.reduce( (sum, game) => {
//      return sum + game["backers"];
// }, 0);
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalcontributions = GAMES_JSON.reduce((sum, game) => {
  return sum + game["backers"];
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalcontributions.toLocaleString("en-US")}`;
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalraised = GAMES_JSON.reduce((sum, game) => {
  return sum + game["pledged"];
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalraised.toLocaleString("en-US")}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let unfunded = GAMES_JSON.filter((game) => {
    return game["pledged"] < game["goal"];
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let funded = GAMES_JSON.filter((game) => {
    return game["pledged"] >= game["goal"];
  });
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(funded);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
showAllGames();
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// document.getElementById("myBtn").addEventListener("click", displayDate);
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */
// grab the description container
const descriptionContainer = document.getElementById("description-container");

let funded_games = GAMES_JSON.filter((game) => {
  return game["pledged"] >= game["goal"];
});
let count_funded = funded_games.length;
const total_funded = GAMES_JSON.reduce((sum, game) => {
  return sum + game["pledged"];
}, 0);
// use filter or reduce to count the number of unfunded games

console.log(count_funded, total_funded);
let displayStr = "";
// create a string that explains the number of unfunded games using the ternary operator
if (GAMES_JSON.length - count_funded > 1) {
  displayStr = `A total of ${total_funded} has been raised for ${
    GAMES_JSON.length
  } games. Currently, ${
    GAMES_JSON.length - count_funded
  } games remain unfunded.`;
} else {
  displayStr = `A total of ${total_funded} has been raised for ${
    GAMES_JSON.length
  } games. Currently, ${
    GAMES_JSON.length - count_funded
  } game remains unfunded.`;
}
console.log(displayStr);
// create a new DOM element containing the template string and append it to the description container
let new_info = document.createElement("p");
new_info.innerText = displayStr;
descriptionContainer.append(new_info);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [game1, game2, ...rest] = sortedGames;
console.log(game1, game2);
// create a new element to hold the name of the top pledge game, then append it to the correct element
let first_game = document.createElement("p");
first_game.innerText = game1["name"];
firstGameContainer.appendChild(first_game);
// do the same for the runner up item
let second_game = document.createElement("p");
second_game.innerText = game2["name"];
secondGameContainer.appendChild(second_game);
