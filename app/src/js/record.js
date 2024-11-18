"use strict";

const { Game } = require("./game.js");
const { Turn } = require("./turn.js");
const { Team } = require("./team.js");

class Record {

  constructor() {
    this.game = new Game();
    this.teams = [];
    this.finalScores = [];
    this.scores = [];
    this.teamNames = [];
    this.history = []; //array of Turns
    this.currentTurnNumber = 0;
    this.currentTeam = 0;
    this.teamCount = 0;
  }
  addTeam(team) {
    this.teams.push(team);
    this.teamCount += 1;
    this.finalScores.push(0);
  }
  addTurn(turn) {
    this.history.push(turn);
    this.currentTurn += 1;
    this.currentTeam = (this.currentTeam + 1) % this.teamCount;
  }

}
let newRecord = new Record();
console.log(newRecord);
