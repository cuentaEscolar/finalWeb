const fs = require("fs");
const path = require("path");
const CRUD_utils = require("./CRUD_utils.js");
const UserModel = require('../models/user')
const userClass = require("./../src/js/user.js");
const User = require("../models/user");

const userFile = path.join(__dirname, "./../data/users.json");
const userJsonStr = fs.readFileSync(userFile);
const rawUsers = JSON.parse(userJsonStr);

let userArr = [];
rawUsers.forEach(element => {
	userArr.push(userClass.generateFromObject(element));
});

userArr.forEach((user) => {
	UserModel(user).save().then((doc) => console.log(doc));
});

const getUsers = CRUD_utils.getX(UserModel);
const getUsersByUuid = CRUD_utils.getXbyY("uuid")(UserModel);
const getUsersByEmail = CRUD_utils.getXbyY("email")(UserModel);


function postUser() {

}

module.exports = { getUsers, getUsersByUuid, getUsersByEmail }
