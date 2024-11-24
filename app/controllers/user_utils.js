const fs = require("fs");
const path = require("path");
const CRUD_utils = require("./CRUD_utils.js");
const { loadXandReturn, getX, getXbyY, createX, deleteXbyY, updateXbyY, dropModel } = require("./CRUD_utils.js");
const UserModel = require('../models/user')
const UserClass = require("./../src/js/user.js");
const User = require("../models/user");

const userFile = path.join(__dirname, "./../data/users.json");
const userJsonStr = fs.readFileSync(userFile);
const rawUsers = JSON.parse(userJsonStr);

let userArr = [];
userArr = loadXandReturn("./../data/users.json")(UserModel);
/*rawUsers.forEach(element => {
  let user = UserClass.generateFromObject(element);
  UserModel(user).save().then((doc) => console.log(doc));
  userArr.push(user);
});*/

const createUser = createX("User")(UserModel);
const getUsers = getX(UserModel);
const getUserBy = {
  uuid: getXbyY("uuid")(UserModel),
  email: getXbyY("email")(UserModel),
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
  login,
  dropUsers
}
