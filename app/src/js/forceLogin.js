"use strict";
console.log("hi");
//let leaderboardA = document.getElementById("leaderboard");
if (sessionStorage.getItem("loggedIn") != null) sessionStorage.setItem("loggedIn", false);

let home = document.getElementById("home");
let login = document.getElementById("login");
let create = document.getElementById("create");
let view = document.getElementById("view");
let leaderboard = document.getElementById("leaderboard");

leaderboard.onclick = (
  () => { window.location.href = "stub";}  
  );

