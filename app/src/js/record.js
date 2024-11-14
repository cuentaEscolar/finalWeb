"use strict";

const { Game } = require("./game.js");

class Turn {
  constructor(turnNumber, team, question, rightWrong) {
    this.turnNumber = turnNumber;
    this.team = team;
    this.question = question;
    this.rightWrong = rightWrong;
  }

}
class Record {

  constructor() {
    this.game = new Game();
    this.teamNames = [];
    this.scores = [];
    this.history = []; //array of Turns
    this.currentTurn = 0;
    this.currentTeam = 0;
    this.teamCount = 0;
  }
  addTeam(teamName) {
    this.teamNames.push(teamName);
    this.teamCount += 1;
  }
  addTurn(turn) {
    this.history.push(turn);
    this.currentTurn += 1;
    this.currentTeam = (this.currentTeam + 1) % this.teamCount;
  }

}
let newRecord = new Record();
console.log(newRecord);
