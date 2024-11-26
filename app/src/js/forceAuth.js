
const getX = (x) => sessionStorage.getItem(x);
if (getX("authToken") === "false" || getX("authToken") == null) {
  if (getX("authToken") == null) sessionStorage.setItem("authToken", "false");
  sessionStorage.setItem("userInfo", "false");
  window.location.href = "/stub";
}
