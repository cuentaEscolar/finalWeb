"use strict";
const bcrypt = require("bcrypt");
const utils = require("./utils.js");
const generateUUID = utils.generateUUID;

class User {
  constructor(username, email, password, role) {
    this.salt = bcrypt.genSaltSync(10);
    this.username = username;
    this.email_ = bcrypt.hashSync(email, this.salt);
    this.password = bcrypt.hashSync(password, this.salt);
    this.role = role;
    this.uuid = generateUUID();
    this.img = "https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png"
  }
  static generateGuest() {
    return new User("anonymous", "none", "not needed", "GUEST");
  }

  static generateFromJson(obj) {
    return this.generateFromObject(JSON.parse(obj));
  }
  static getFields() {
    return ["username", "email", "password", "role", "img"];
  }
  static generateFromObject(obj) {
    let fields = User.getFields();
    obj = utils.fieldCleanUp(fields, obj);
    let funkyUser = new User(obj["username"], obj["email"], obj["password"], obj["role"])
    if (obj["img"]) funkyUser.img_ = obj["img"];
    return funkyUser;
  }
  set img_(href) {
    this.img = href;
  }
  set email_(mail) {
    this.email = mail;
  }
}
module.exports = User;
