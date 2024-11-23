const fs = require("fs");
const path = require("path");
const CRUD_utils = require("./CRUD_utils.js");
const UserModel = require('../models/user')
const UserClass = require("./../src/js/user.js");
const User = require("../models/user");

const userFile = path.join(__dirname, "./../data/users.json");
const userJsonStr = fs.readFileSync(userFile);
const rawUsers = JSON.parse(userJsonStr);
const getXbyY = CRUD_utils.getXbyY;
const deleteXbyY = CRUD_utils.deleteXbyY;
const updateXbyY = CRUD_utils.updateXbyY;

let userArr = [];
rawUsers.forEach(element => {
  let user = UserClass.generateFromObject(element);
  UserModel(user).save().then((doc) => console.log(doc));
  userArr.push(user);
});

const createUser = CRUD_utils.createX("User")(UserModel);
const getUsers = CRUD_utils.getX(UserModel);
const getUserBy = {
  uuid: getXbyY("uuid")(UserModel),
  email: getXbyY("email")(UserModel),
}
const deleteUserBy = {
  uuid: deleteXbyY("user","uuid")(UserModel),
  email: deleteXbyY("user","email")(UserModel),
}
const updateUserBy = {
  email: updateXbyY("user", "email")(UserModel)(UserClass.getFields()),
  uuid: updateXbyY("user", "uuid")(UserModel)(UserClass.getFields()),
}

function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: `${email}` })
    .then(user => {
      let token = user.generateToken(password);
      console.log(token)
      if (token != undefined) {
        res.status(200)
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.send(token);
      } else {
        res.status(404);
        res.set('Content-Type', 'text/plain; charset=utf-8');
        consol.log("no such user");
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
  login
}
