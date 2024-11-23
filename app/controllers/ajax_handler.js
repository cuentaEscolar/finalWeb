"use strict";
//const user_utils = request("user_utils") 

function getXhrResponse(xhr, onSuccess, onError) {
  if (xhr.status == 200) {
    console.log("responseText");
    onSuccess(xhr.responseText);
  } else {
    onError(xhr.status + ":" + xhr.statusText);
  }
}
function login(emailPassword, onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader('Content-Type', "application/json");
  xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
  xhr.send(JSON.stringify(emailPassword));

}
