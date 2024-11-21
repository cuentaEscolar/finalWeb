"use strict";
const bcrypt = require("bcryptjs");
const utils = require("./utils.js");
const generateUUID = utils.generateUUID;

class User {
	constructor(username, email, password, role) {
		this.salt = bcrypt.genSaltSync(10);
		this.username = username;
		this.email = bcrypt.hashSync(email, this.salt);
		this.password = bcrypt.hashSync(password, this.salt);
		this.role = role;
		this.uuid = generateUUID();
		this.img = "https://static.wikia.nocookie.net/silly-cat/images/4/4f/Wire_Cat.png/revision/latest?cb=20231001190626";
	}
	static generateGuest() {
		return new User("anonymous", "none", "not needed", "GUEST");
	}

	static generateFromJson(obj) {
		return this.generateFromObject(JSON.parse(obj));
	}
	static generateFromObject(obj) {
		let fields = ["username", "email", "password", "role", "img"];
		obj = utils.fieldCleanUp(obj);
		let funkyUser = new User(obj["username"], obj["email"]) 
		if (obj["img"]) funkyUser.img = obj["img"];
		return funkyUser;
	}
	set img (href) {
		this.img = href;
	}
}
