"use strict";

let login_button = document.getElementById("login_button");
let email = document.getElementById("email");
let password = document.getElementById("password");
console.log("loggedStartup");
function onSuccess(x) {
  console.log("success");
  sessionStorage.setItem("authToken", x);
  window.location.href = "home";
}

function login_request() {
  console.log("email, password");
  let email_password = {
    email: email.value,
    password: password.value
  };
  console.log(email_password)
  loginFunc(email_password, onSuccess, (() => console.log("failure"))
  );
}
login_button.addEventListener("click", login_request);
