"use strict";

console.log("view.js was loaded");

const docById = (x) => document.getElementById(x);
const tableBody = docById("games_table");
const load_games = docById("load_games");

//make_td :: String => String
const make_td = x => {
  return `
  <td> 
    ${x}
  </td>
  `

}
const saveGames = (x) => { sessionStorage.setItem("games", x); };

const getGamesFromUser = (user) => {
  // this shoudl look like docs
  let id = { creatorUuid: user._id };
  genericCRUD("GET")(`games/uuid/${id.creatorUuid}`)(id, saveGames, (x) => console.log("failure"));

  let local_games = JSON.parse(JSON.parse(sessionStorage.getItem("games"))[0]);
  return local_games;

}
//make_tr :: User => Str
const make_tr = (x) => (game) => {
  return `<tr>
    ${make_td(0)}
    ${make_td(game.title)}
    ${make_td(x.username)}
    ${make_td("fat chance")}
    ${make_td("not happening")}
  </tr>
  `
}
const user = load_userInfo()
const fill_table = x =>
  x.map(make_tr(user)).reduce((acc, cur) => acc + cur);
;
const user_games = getGamesFromUser(load_userInfo());
console.log(user_games);
load_games.addEventListener("click", (e) => {
  tableBody.innerHTML = fill_table(user_games);
});
