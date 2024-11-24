
"use strict";
const express = require('express');
const path = require("path");
const dataHandler = require("../controllers/data_handler");
const router = express.Router();


router.route("/").get((req, res) =>
  res.sendFile(path.join(__dirname, "../", "views", "play.html"))
);

module.exports = router;
