"use strict";
console.log("hi");
//let leaderboardA = document.getElementById("leaderboard");
let home = document.getElementById("home");
let login = document.getElementById("login");
let create = document.getElementById("create");
let view = document.getElementById("view");
let play = document.getElementById("play");
let leaderboard = document.getElementById("leaderboard");

let profile = document.getElementsByClassName("profile").item(0);
function userInfoRequest() {

  let user = parseJwt(sessionStorage.getItem("authToken"));
  let id_req = {_id : user._id};
  genericPost("/user")(id_req,saveUser, (x)=>console.log(x));

}
function saveUser(x){
  sessionStorage.setItem("userInfo",x);
}
function refresher() {
  console.log("freshy");
  if (sessionStorage.getItem("authToken") === "false") {
    profile.innerHTML = notLoggedInHtml;
    let refresherId = document.getElementById("refresherId");
    refresherId.addEventListener("click", ((e) => refresher()));
  } else {
    profile.innerHTML = logOutHtml;
    userInfoRequest();
    console.log(sessionStorage.getItem("userInfo"));
    let logOutId = document.getElementById("logOutId");
    logOutId.addEventListener("click", ((e) => log_out()));
  }
}
let notLoggedInHtml = `
	<div class="box"> 
	<img style="border-radius:50%;" src="https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png">
	</div>
	<h2 class="h4" id="h2Over"> Y you haz not logged in</h2>
	<div class="row">
		<a href="login" class="btn btn-primary" id="loginPage">Log in</a>
		<a href="#" class="btn btn-primary" id="loginAsGuest">Log in as guest</a>
	</div>
	<div class="row">
		<a href="#"  class="btn btn-primary" id="refresherId">Refresh</a>
	</div>
`
const log_out = (() => {
  sessionStorage.setItem("authToken", "false");
  refresher();
});
let logOutHtml = `
	<div class="row">
		<a href="#"  class="btn btn-primary" id="logOutId">Log Out</a>
	</div>
`

profile.innerHTML = notLoggedInHtml;
let refresherId = document.getElementById("refresherId");
refresherId.addEventListener("click", ((e) => refresher()));

let hrefer = ((str) => { window.location.href = str; });
let stubber = (() => { window.location.href = "stub"; });

let ifLoggedIn = ((str) => {
  console.log(str);
  if (sessionStorage.getItem("authToken") === "false") {
    stubber();
  } else {
    hrefer(str);
  }
});

if (sessionStorage.getItem("authToken") === null || sessionStorage.getItem("authToken") === "false") {
  console.log("wat");
  sessionStorage.setItem("authToken", "false");
} else {
  console.log("logged in");
}

create.addEventListener("click", (e) => ifLoggedIn("create"));
view.addEventListener("click", (e) => ifLoggedIn("view"));
play.addEventListener("click", (e) => ifLoggedIn("play"));
leaderboard.addEventListener("click", (e) => ifLoggedIn("leaderboard"));

