"use strict";

const utils = require("./utils.js");

class Team {

  constructor(teamName, teamMembers, emails) {
    //these may be created from an object
    this._teamName = teamName;
    this._teamMembers = teamMembers;
    this._emails = emails;
    this._totalScore = 0;
    this._uuid = utils.generateUUID();
  }

  static loadFromObject(obj) {
    let fields = ["uuid", "teamName", "teamMembers", "emails", "totalScore"]
    obj = utils.fieldCleanUp(fields, obj);
    let unloaded = new Team(teamName, teamMembers, emails);
    unloaded._uuid = obj.uuid;
    unloaded._totalScore = obj.totalScore;
    return unloaded;
  }
  static loadFromJson(obj) {
    return this.loadFromObject(JSON.parse(jsonValue));
  }

}
