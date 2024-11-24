
const getX = (x) => sessionStorage.getItem(x);
if (getX("authToken")==="false" || getX("authToken") == null){
  window.location.href =  "/stub";
}
