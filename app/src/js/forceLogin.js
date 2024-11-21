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
let usedToHave = `
            <h2 class="card-title h4" id="username">Tu Cuenta</h2>
            <div class="bg-dark p-3 rounded mb-3 login-box" id="box">
              <li>Rewrote the JS to generate cleaner code</li>
              <li>Rewrote the CSS</li>
              <li>Added new features!</li>
              </ul>
            </div>
            <h3 class="h5">Other Tools</h3>
            <ul class="list-unstyled">
              <li><a href="#" class="text-light">HTML Cheatsheet</a></li>
              <li><a href="#" class="text-light">Webmaster Links</a></li>
              <li><a href="#" class="text-light">Site Ideas</a></li>
            </ul>
`
profile.innerHTML = "Not Logged In\n";
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

