"use strict";
const express = require('express');
const path = require("path");
const router = express.Router();

router.route("/").get((req, res) =>
  res.sendFile(path.join(__dirname, "../", "views", "signup.html"))
);

router.route("/").post((req, res) =>
  res.sendFile(path.join(__dirname, "../", "views", "signup.html"))
);
module.exports = router;
