"use strict";
const express = require('express');
const user_utils = require("../controllers/user_utils");
const path = require("path");
const router = express.Router();

router.route("/")
  .post((req, res) => user_utils.getFullInfo(req, res))
  .put((req, res) => user_utils.createUser(req, res));
router.route("/uuid/:uuid")
  .get((req, res) => {
    return user_utils.getUserBy["uuid"](req, res);
  }
  );

module.exports = router;
