const fs = require("fs");
const path = require("path");
const userFile = path.join(__dirname, "./../data/users.json");
const userJsonStr = fs.readFileSync(userFile);
const rawUsers = JSON.parse(userJsonStr);

let userArr = [];
rawUsers.forEach(element => {
  userArr.push(userClass.generateFromObject(element));
});
function getUsers() {
  return userArr;
}
