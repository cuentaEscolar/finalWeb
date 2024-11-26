function saveUserInfo(x) {
	console.log(`saveUserInfo ${x}`);
	sessionStorage.setItem("userInfo", x);
}
function userInfoRequest() {
	let user = (parseJwt(sessionStorage.getItem("authToken")));
	let id_req = { _id: user._id };
	console.log(`idreq ${JSON.stringify(id_req)}`);
	genericCRUD("get")(`/user/_id/${user._id}`)(id_req, saveUserInfo, (x) => console.log(`failure ${x}`));
}
function load_userInfo(){
	let user = JSON.parse(getX("userInfo"));
	user = user[0];
	user = JSON.parse(user);
	return user;
}

const getX = (x) => sessionStorage.getItem(x);
if (getX("authToken") === "false" || getX("authToken") == null) {
	if (getX("authToken") == null) sessionStorage.setItem("authToken", "false");
	sessionStorage.setItem("userInfo", "false");
	if (window.location.href.slice(-5)!== "/home")
	{
		window.location.href = "/stub";
	}
} else {
	userInfoRequest();
}
