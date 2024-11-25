"use strict";
const express = require('express');
const user_utils = require("../controllers/user_utils");
const path = require("path");
const router = express.Router();

router.route("/")
  .post((req, res) => user_utils.getFullInfo(req, res));
router.route("/uuid/:uuid")
  .get((req,res) => { 
    console.log("users/uuid/:uuid");
    console.log(req.params);
    return user_utils.getUserBy["uuid"](req, res);
  }
  );

module.exports = router;
