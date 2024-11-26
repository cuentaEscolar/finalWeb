"use strict";
console.log("homeUtils");
//let leaderboardA = document.getElementById("leaderboard");
const docById = (x) => document.getElementById(x);
let profile = document.getElementsByClassName("profile").item(0);
const refresh_page = () => {window.location.reload()};
const log_out = (() => {
  sessionStorage.setItem("authToken", "false");
  sessionStorage.setItem("userInfo", "false");
  refresh_page();
});
const sidebar = x => {
  let y = `
  <div class="container">
    <div class="row">
      <h2 id="h2Over">${x.username}</h2> 
    </div>
    <div class="row">
      <img id="pfp_img" style="border-radius:50%;" 
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

function post_update_img() {
  let new_img = docById("new_img");
  let new_user = load_userInfo(); 
  new_user.img = new_img.value;
  genericCRUD("POST")(`user/_id/${new_user._id}`)(new_user, saveUserInfo, (x) => console.log("failure"));
  sessionStorage.setItem("userInfo", "false");
  userInfoRequest();
  docById("pfp_img").setAttribute("src", new_img.value);
  console.log(docById("pfp_img"));

  //refresh_page();

}
const notLoggedInHtml = `
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
if (getX("authToken") === "false" || getX("authToken") === null){

  profile.innerHTML = notLoggedInHtml;
  let refresherId = docById("refresherId");
   refresherId.addEventListener("click", ((e) => refresh_page()));
}else{
  profile.innerHTML = sidebar(load_userInfo());
  let logOutId = docById("logOutId");
  let updateImg = docById("updateImg");
  logOutId.addEventListener("click", ((e) => log_out()));
  updateImg.addEventListener("click", ((e) => post_update_img()));
}

