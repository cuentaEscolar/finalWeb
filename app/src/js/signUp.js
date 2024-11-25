"use strict";

let userName = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
let confirm_password_msg = document.getElementById("confirm-password-msg");
let default_img = document.getElementById("default_img");
let signUp_btn = document.getElementById("signUp_btn");

const confirmMsg = () => {
  if (confirm_password.value != password.value) {
    confirm_password_msg.innerHTML = `<p style="color: red; ">passwords dont match</p>`;
  } else {
    confirm_password_msg.innerHTML = "";
    name
  }
}
confirm_password.addEventListener("keyup", confirmMsg);
password.addEventListener("keyup", confirmMsg);

signUp_btn.addEventListener("click", () => {
  console.log(`default_img: ${parseInt(default_img.value)}`);

  let user = { username: userName.value, email: email.value, password: password.value, role: "USER", default_img: parseInt(default_img.value) }
  console.log("pressed :c");
  genericCRUD("PUT")("/user")(
    (user),
    (x) => {
      console.log(`${x}`);
      window.location.href = "/login";
    },
    (x) => console.log("failure")
  );
}

);

