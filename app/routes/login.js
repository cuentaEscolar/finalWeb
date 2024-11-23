"use strict";
const express = require('express');
const user_utils = require("../controllers/user_utils");
const path = require("path");
const router = express.Router();

router.route("/").get((req, res) =>
  res.sendFile(path.join(__dirname, "../", "views", "login.html"))
);

router.route("/").post((req, res) => {
  console.log("inside the post route");
  console.log(req.body);
  user_utils.login(req, res);
}
);
module.exports = router;
