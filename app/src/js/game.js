"use strict";
const utils = require("./utils.js");
const generateUUID = utils.generateUUID;
class Game {
  constructor(rows, cols, title, topics, questions, answers, scores, creatorUuid) {
    this.rows = rows;
    this.cols = cols;
    this.title = title;
    this.topics = topics;
    this.questions = questions;
    this.answers = answers;
    this.scores = scores;
    this.uuid = generateUUID();
    this.creatorUuid = creatorUuid;
  }
  static getFields() {
    return ["rows", "cols", "title", "topics", "questions", "answers", "scores", "uuid", "creatorUuid"];
  }
  static guestDefault() {
    rows = 3;
    rows = 1;
    this.cols = 1;
    this.title = "Miau Miau";
    this.topics = [];
    this.questions = [];
    this.answers = [];
    this.scores = [];
    this.uuid = generateUUID();
    this.creatorUuid = "guest";
  }
  static catJson(){
    return 0;
  } 

}
module.exports = { Game };
