const fs = require("fs");
const path = require("path");
const { loadXandReturn, getX, getXbyY, createX, deleteXbyY, updateXbyY, dropModel } = require("./CRUD_utils.js");
const UserModel = require('../models/user');
console.log(`User model ${UserModel}`);
const UserClass = require("./../src/js/user.js");
const User = require("../models/user");

let userArr = [];
userArr = loadXandReturn("./../data/users.json")(UserModel)(UserClass);
userArr.push(UserModel(UserClass.generateGuest()));
console.log(userArr);

const createUser = createX(UserClass)(UserModel);
const getUsers = getX(UserModel);
const getUserBy = {
  uuid: getXbyY(["uuid"])(UserModel),
  _id: getXbyY(["_id"])(UserModel),
  email: getXbyY(["email"])(UserModel),
}
const deleteUserBy = {
  uuid: deleteXbyY("user", "uuid")(UserModel),
  email: deleteXbyY("user", "email")(UserModel),
}
const updateUserBy = {
  email: updateXbyY("user", "email")(UserModel)(UserClass.getFields()),
  uuid: updateXbyY("user", "uuid")(UserModel)(UserClass.getFields()),
}
const dropUsers = dropModel(UserModel);
const getFullInfo = (req, res) => {
  let uuid = req.body.uuid;
  req.params["uuid"] = uuid;
  return getUserBy["uuid"](req, res);
}
function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  console.log(`the email and password are ${email} ${password}`)

  User.findOne({ email: `${email}` })
    .then(user => {
      console.log("found user");
      let token = user.generateToken(password);
      console.log(token)
      if (token != undefined) {
        res.status(200)
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(token);
      } else {
        res.status(404);
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(`Wrong email or password`);
      }
    })
    .catch(err => {
      res.status(404);
      res.set('Content-Type', 'text/plain; charset=utf-8');
      res.send(`Wrong email or password`);
    });
}


module.exports = {
  createUser, //C
  getUsers,   // r 
  getUserBy,  // r 
  updateUserBy, // u
  deleteUserBy,
  login,
  dropUsers,
  getFullInfo
}
