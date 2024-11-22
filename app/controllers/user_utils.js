const fs = require("fs");
const path = require("path");
const UserModel = require('../models/user')
const userClass = require("./../src/js/user.js");
const userFile = path.join(__dirname, "./../data/users.json");
const userJsonStr = fs.readFileSync(userFile);
const rawUsers = JSON.parse(userJsonStr);

let userArr = [];
rawUsers.forEach(element => {
  userArr.push(userClass.generateFromObject(element));
});

userArr.forEach((user)=>{
  UserModel(user).save().then((doc)=>console.log(doc));
});

function getUsers() {
  return userArr;
}

function getUsersByUuid(req, res) {
  let uuid = req.params.uuid;
  UserModel.findOne({ uuid: `${uuid}`}).then(user => res.status(200).json(user));
}

function updateUserByUuid(req, res){

}

function postUser(){

}

module.exports = { getUsers , getUsersByUuid}
