"use strict";
console.log("hi");
//let leaderboardA = document.getElementById("leaderboard");
let home = document.getElementById("home");
let login = document.getElementById("login");
let create = document.getElementById("create");
let view = document.getElementById("view");
let play = document.getElementById("play");
let leaderboard = document.getElementById("leaderboard");
let stubber = (() => { window.location.href = "stub"; });

console.log(sessionStorage.getItem("loggedIn"));
if (sessionStorage.getItem("loggedIn") === null || sessionStorage.getItem("loggedIn") === "false ") {
  console.log("wat");

  sessionStorage.setItem("loggedIn", "false");
  create.onclick = stubber;
  view.onclick = stubber;
  play.onclick = stubber;
  leaderboard.onclick = stubber;

}

