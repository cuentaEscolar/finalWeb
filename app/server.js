"use strict";
const cors = require('cors');
const express = require("express");
const path = require("path");
const { Game } = require("./src/js/game.js");
const Record = require("./src/js/record.js");
const router = require('./controllers/router');
//const { warn } = require("console");

const app = express();
const port = 3000;
app.use(express.static(__dirname + '/app'));

app.use(express.json());

app.use(cors());
app.use(router);

app.listen(port, () => console.log("listening on port 3k"));
