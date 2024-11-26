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
  console.log("userInfoRequest");
  console.log(`authToken, ${JSON.stringify(parseJwt(sessionStorage.getItem("authToken")))}`);
  let user = (parseJwt(sessionStorage.getItem("authToken")));
  let id_req = { _id: user._id };
  console.log(`idreq ${JSON.stringify(id_req)}`);
  genericCRUD("get")(`/user/_id/${user._id}`)(id_req, saveUser, (x) => console.log(`failure ${x}`));

}
function saveUser(x) {
  console.log(`saveUser ${x}`);
  sessionStorage.setItem("userInfo", x);
}
function post_update_img() {
  let new_img = document.getElementById("new_img");
  if (sessionStorage.getItem("userInfo") === "false"){
    userInfoRequest();
  }
  let new_user = JSON.parse(sessionStorage.getItem("userInfo"));
  new_user.img = new_img.value;
  genericCRUD("POST")(`user/_id/${new_user._id}`)(new_user, saveUser, (x) => console.log("failure"));
  console.log(new_img.value);
  console.log(new_user);
  sessionStorage.setItem("userInfo", "false");
  refresher();

}
function refresher() {
  console.log("freshy");
  if (sessionStorage.getItem("authToken") === "false") {
    profile.innerHTML = notLoggedInHtml;
    let refresherId = document.getElementById("refresherId");
    refresherId.addEventListener("click", ((e) => refresher()));
  } else {
    if (sessionStorage.getItem("userInfo") === "false") {
      console.log("bad image");
      userInfoRequest();
    }
    console.log(`userInfo: ${sessionStorage.getItem("userInfo")}`);
    if (sessionStorage.getItem("userInfo")==="false")userInfoRequest();
    profile.innerHTML = logOutHtml();

    let logOutId = document.getElementById("logOutId");
    let updateImg = document.getElementById("updateImg");
    logOutId.addEventListener("click", ((e) => log_out()));
    updateImg.addEventListener("click", ((e) => post_update_img()));
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
  sessionStorage.setItem("userInfo", "false");
  refresher();
});
const logOutHtml = () => {

  let x = JSON.parse(sessionStorage.getItem("userInfo"));
  if (x === false || x === "false") userInfoRequest();
  if (typeof(x) === Array){
    x = x[0];
    x = JSON.parse(x);
    console.log("arr");
  }
  if (typeof(x) === String){
    console.log("string");
    x = JSON.parse(x);
  }
  x = JSON.parse(x);
  console.log(`type of x ${typeof(x)}`);
  console.log(`x, parsedIn logOut ${x}`);

  let y = `
  <div class="container">
    <div class="row">
      <h2 id="h2Over">${x.username}</h2> 
    </div>
    <div class="row">
      <img style="border-radius:50%;" 
      src="${x["img"]}">
    </div>
    <div class="row">
    </div>
    <div class="row">
      <a href="#"  class="btn btn-danger" id="logOutId">log out</a>
      <div class="box">
      <a href="#"  class="btn btn-primary" id="updateImg">updateImg</a>
      <div class="input-group mb-1">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">img:/</span>
      </div>
       <input type="text" class="form-control" id="new_img" aria-describedby="basic-addon3">
      </div>
</div>

</div>
    </div>
	</div>
`
  return y;
}

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
  refresher();
}

create.addEventListener("click", (e) => ifLoggedIn("create"));
view.addEventListener("click", (e) => ifLoggedIn("view"));
play.addEventListener("click", (e) => ifLoggedIn("play"));
leaderboard.addEventListener("click", (e) => ifLoggedIn("leaderboard"));

