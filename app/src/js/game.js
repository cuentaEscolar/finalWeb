"use strict";
const utils = require("./utils.js");
const generateUUID = utils.generateUUID;
class Game {
  constructor() {
    this.rows = 0;
    this.cols = 0;
    this.title = "";
    this.topics = [];
    this.questions = [];
    this.answers = [];
    this.scores = [];
    this.uuid = generateUUID();
  }
}
module.exports = { Game };
