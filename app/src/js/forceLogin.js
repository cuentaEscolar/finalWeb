"use strict";
console.log("hi");
//let leaderboardA = document.getElementById("leaderboard");
let home = document.getElementById("home");
let login = document.getElementById("login");
let create = document.getElementById("create");
let view = document.getElementById("view");
let play = document.getElementById("play");
let leaderboard = document.getElementById("leaderboard");

let hrefer = ((str) => { window.location.href = str; });
let stubber = (() => { window.location.href = "stub"; });

let ifLoggedIn = ((str) => {
  console.log(str);
  if (sessionStorage.getItem("loggedIn") === "false") {
    stubber();
  } else {
    hrefer(str);
  }
});
console.log(sessionStorage.getItem("loggedIn"));
console.log(sessionStorage.getItem("loggedIn") === "false");

if (sessionStorage.getItem("loggedIn") === null || sessionStorage.getItem("loggedIn") === "false") {
  console.log("wat");
  sessionStorage.setItem("loggedIn", "false");
}

create.addEventListener("click", (e) => ifLoggedIn("create"));
view.addEventListener("click", (e) => ifLoggedIn("view"));
play.addEventListener("click", (e) => ifLoggedIn("play"));
leaderboard.addEventListener("click", (e) => ifLoggedIn("leaderboard"));

