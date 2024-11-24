"use strict";
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
function getXhrResponse(xhr, onSuccess, onError) {
  if (xhr.status == 200) {
    console.log("responseText");
    onSuccess(xhr.responseText);
  } else {
    onError(xhr.status + ":" + xhr.statusText);
  }
}
function loginFunc(emailPassword, onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader('Content-Type', "application/json");
  xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
  xhr.send(JSON.stringify(emailPassword));

}

function userFunc(userId, onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/user", true);
  xhr.setRequestHeader('Content-Type', "application/json");
  xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
  xhr.send(JSON.stringify(userId));

}

const genericPost = route => (obj, onSuccess, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", route, true);
  xhr.setRequestHeader('Content-Type', "application/json");
  xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
  xhr.send(JSON.stringify(obj));
}
