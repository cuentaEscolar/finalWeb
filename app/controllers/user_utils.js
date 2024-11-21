const fs = require("fs");
const path = require("path");
const User = require('../models/user')
const userClass = require("./../src/js/user.js");
const userFile = path.join(__dirname, "./../data/users.json");
const userJsonStr = fs.readFileSync(userFile);
const rawUsers = JSON.parse(userJsonStr);

let userArr = [];
rawUsers.forEach(element => {
  userArr.push(userClass.generateFromObject(element));
});
console.log(userArr);
function getUsers() {
  return userArr;
}
module.exports = { getUsers };
