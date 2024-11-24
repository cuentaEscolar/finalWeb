"use strict";

let login_button = document.getElementById("login_button");
let email = document.getElementById("email");
let password = document.getElementById("password");
console.log("loggedStartup");

function login_request() {
  console.log("email, password");
  let email_password = {
    email: email.value,
    password: password.value
  };
  console.log(email_password)
  login(email_password, (() => console.log("success")), (() => console.log("failure"))
  );
}
login_button.addEventListener("click", login_request);
