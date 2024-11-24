"use strict";
let mongoose = require("mongoose");

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
this.exports = { gameSchema };
