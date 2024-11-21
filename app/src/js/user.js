"use strict";
const bcrypt = require("bcryptjs");
const utils = require("./utils.js");
const generateUUID = utils.generateUUID;

class User {
  constructor(username, email, password) {
    this.salt = bcrypt.genSaltSync(10);
    this.email = bcrypt.hashSync(email, salt = this.salt);
    this.password = bcrypt.hashSync(password, this.salt);
    this.uuid = generateUUID();
  }
}
