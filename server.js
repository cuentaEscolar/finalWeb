"use strict";

process.env.TOKEN_KEY = "22775973-3dbc-4ffb-8dbc-8ec1d6c15efb";

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


