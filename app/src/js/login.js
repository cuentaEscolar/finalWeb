"use strict";

let login_button = document.getElementById("login_button");
let email = document.getElementById("email");
let password = document.getElementById("password");
console.log("logged");

function login_request() {
  console.log(email.value);
  console.log(password.value);
}
login_button.addEventListener("click", login_request);
