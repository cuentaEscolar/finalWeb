"use strict";
class Turn {
  constructor(turnNumber, team, question, rightWrong) {
    this.turnNumber = turnNumber;
    this.team = team;
    this.question = question;
    this.rightWrong = rightWrong;
  }
}
module.exports = { Turn };
