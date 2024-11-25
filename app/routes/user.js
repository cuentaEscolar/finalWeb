"use strict";
const express = require('express');
const user_utils = require("../controllers/user_utils");
const path = require("path");
const router = express.Router();

router.route("/")
  .post((req, res) => user_utils.getFullInfo(req, res))
  .put((req, res) => user_utils.createUser(req, res));

router.route("/uuid/:uuid")
  .get((req, res) => user_utils.getUserBy["uuid"](req, res))
  .post((req, res) => user_utils.updateUserBy["uuid"](req, res));

router.route("/_id/:_id")
  .get((req, res) => user_utils.getUserBy["_id"](req, res))
  .post((req, res) => {
    console.log("user _id post");
    console.log(req.params);
    console.log(req.body);
    return user_utils.updateUserBy["_id"](req, res);
  });

module.exports = router;
