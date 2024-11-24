"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let mongoDB = 'mongodb://localhost:27017/GamesDB';
let privateKey = process.env.TOKEN_KEY;

mongoose.connect(mongoDB, { useNewUrlParser: true });

let gameSchema = mongoose.Schema({

	rows: {
		type: String,
		require: true
	},

	cols: {
		type: String,
		require: true
	},

	title: {
		type: String,
		require: true
	},

	topics: {
		type: String,
		require: true
	},

	questions: {
		type: String,
		require: true
	},

	answers: {
		type: String,
		require: true
	},

	scores: {
		type: Number,
		require: true
	},

	uuid: {
		type: String,
		require: true
	},

	creatorUuid: {
		type: String,
		require: true
	},

});

gameSchema.pre('save', function(next) {
	let user = this;
	user.password = bcrypt.hashSync(user.password, 10);
	next();
})


let Game = mongoose.model('game', gameSchema);

module.exports = Game;
