"use strict";
const express = require('express');
const path = require("path");
const user_utils = require("../controllers/user_utils");
const game_utils = require("../controllers/game_utils");
const { userInfo } = require('os');
const router = express.Router();

router.route("/games").get((req, res) => game_utils.getGames(req, res));
router.route("/users").get((req, res) => user_utils.getUsers(req, res));
router.route("/users/uuid/:uuid")
  .get((req, res) => user_utils.getUserBy["uuid"](req, res))
  ;
router.route("/users/kill")
  .get((req, res) => user_utils.dropUsers(req, res));
;
function debug(req, res, next) {
  console.log("HI");
  // console.log(user_utils.updateUserBy);
  //console.log(user_utils.updateUserBy["email"]);
  return next();
}
router.use("/users/email/:email", debug);
router.route("/users/email/:email")
  .get((req, res) => user_utils.getUserBy["email"](req, res))
  .put((req, res) => user_utils.updateUserBy["email"](req, res))
  .delete((req, res) => user_utils.deleteUserBy["email"](req, res));

module.exports = router;
