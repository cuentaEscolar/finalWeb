"use strict";
const express = require('express');
const user_utils = require("../controllers/user_utils");
const path = require("path");
const router = express.Router();

router.route("/")
  .post((req, res) => user_utils.getUserBy["_id"](req, res));

module.exports = router;
