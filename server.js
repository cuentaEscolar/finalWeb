"use strict";
const cors = require('cors');
const express = require("express");
const path = require("path");
const { Game } = require("./app/src/js/game.js");
const Record = require("./app/src/js/record.js");
const router = require('./app/controllers/router');
const UserModel = require("./app/models/user.js")
const dataHandler = require("./app/controllers/data_handler.js")
//const { warn } = require("console");

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/app'));

app.use(express.json());

app.use(cors());
app.use(router);

app.listen(port, () => console.log("listening on port 3k"));

let testUsers = dataHandler.getUsers();
testUsers.forEach((user) => {
  UserModel(user).save().then((doc) => console.log(doc));
});

console.log(testUsers);
