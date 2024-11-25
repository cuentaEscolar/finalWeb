"use strict";
const bcrypt = require("bcrypt");
const utils = require("./utils.js");
const generateUUID = utils.generateUUID;

class User {
  constructor(username, email, password, role) {
    console.log(`User gen ${username}, ${email}, ${password}, ${role}`)
    this.salt = bcrypt.genSaltSync(10);
    this.username_ = username;
    this.email_ = email;//bcrypt.hashSync(email, this.salt);
    this.password = bcrypt.hashSync(password, this.salt);
    this.role = role;
    this.uuid = generateUUID();
    this.img = "https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png"
  }
  static generateGuest() {
    let guest = new User("anonymous", "guest@silly-cat.fake", "not needed", "GUEST");
    guest.img_ = "https://static.wikia.nocookie.net/silly-cat/images/2/2c/Why_is_blud_flabbergasted.png/";
    guest.uuid = "guest";
    return guest;
  }

  static generateFromJson(obj) {
    return this.generateFromObject(JSON.parse(obj));
  }
  static getDefaultImages() {
    return [
      "https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png",
      "https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png",
      "https://static.wikia.nocookie.net/silly-cat/images/f/f7/Apple_Cat.jpg",
      "https://static.wikia.nocookie.net/silly-cat/images/2/2f/Bingus.png",
      "https://static.wikia.nocookie.net/silly-cat/images/0/08/Big_Poo.png"]
  }
  static getFields() {
    return ["username", "email", "password", "role", "img"];
  }
  static generateFromObject(obj) {
    let fields = User.getFields();
    obj["img"] = User.getDefaultImages()[obj["default_img"]];
    obj = utils.fieldCleanUp(fields, obj);
    console.log(`default img ${obj.default_img}`);
    console.log(`img ${obj.img}`);
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

  set username_(username) {
    this.username = username;
  }
}
module.exports = User;
