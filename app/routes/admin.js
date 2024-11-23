"use strict";
const express = require('express');
const path = require("path");
const user_utils = require("../controllers/user_utils")
const router = express.Router();

router.route("/users").get((req, res) => user_utils.getUsers(req, res));
router.route("/users/uuid/:uuid")
	.get((req, res) => user_utils.getUsersByUuid(req, res))
;
router.route("/users/email/:email")
	.get((req, res) => user_utils.getUsersByEmail(req, res))
	.put((req,res) => user_utils.updateUserBy["email"](req,res));
module.exports = router;
