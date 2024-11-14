"use strict";

const utils = require("./utils.js");
class Team {

  constructor(teamName, teamMembers, emails) {

    this.teamName = teamName;
    this.teamName = teamMembers;
    this.emails = emails;
    this.totalScore = 0;
    this._uuid = utils.generateUUID();

  }

}
