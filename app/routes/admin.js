"use strict";
const express = require('express');
const path = require("path");
const user_utils = require("../controllers/user_utils")
const router = express.Router();

router.route("/users");
router.route("/users/:uuid").get((req, res) => user_utils.getUsersByUuid(req, res));
module.exports = router;
