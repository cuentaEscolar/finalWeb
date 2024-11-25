"use strict";
const express = require('express');
const path = require("path");
const dataHandler = require("../controllers/data_handler");
const game_utils = require("../controllers/game_utils.js");
const router = express.Router();


router.route("/")
	.get((req, res) =>
		res.sendFile(path.join(__dirname, "../", "views", "game.html"))
	)
	.put((req, res) => game_utils.createGame(req,res)); 
router.route("/:email/:title")
	.get((req, res) => console.log("uoe"));

module.exports = router;
