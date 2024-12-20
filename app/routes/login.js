"use strict";
const express = require('express');
const user_utils = require("../controllers/user_utils");
const path = require("path");
const router = express.Router();

router.route("/")
  .get((req, res) => res.sendFile(path.join(__dirname, "../", "views", "login.html")))
  .post((req, res) => user_utils.login(req, res));

module.exports = router;
