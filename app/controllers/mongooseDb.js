"use strict";
let mongoose = require("mongoose");
let gameDB = "mongodb://localhost:27017/games"
let recordDB = "mongodb://localhost:27017/recorded_games"
let userDB = "mongodb://localhost:27017/users"
const { userSchema, gameSchema } = require("./databaseSchemas.js");
console.log(userSchema);

