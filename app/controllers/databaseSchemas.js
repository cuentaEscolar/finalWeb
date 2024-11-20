"use strict";
let mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  salt: String,
  email: String,
  password: String,
  uuid: String,
});

const gameSchema = mongoose.Schema({
  rows: Number,
  cols: Number,
  title: String,
  topics: Array,
  questions: Array,
  answers: Array,
  scores: Array,
  uuid: String,
  creatorUuid: String,
});
this.exports = { userSchema, gameSchema };
