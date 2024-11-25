const fs = require("fs");
const path = require("path");
const CRUD_utils = require("./CRUD_utils.js");
const { loadXandReturn, getX, getXbyY, createX, deleteXbyY, updateXbyY, dropModel } = require("./CRUD_utils.js");
const GameModel = require("../models/game");
const GameClass = require("./../src/js/game.js");
const Game = require("../models/game");

// Funciones CRUD para trabajar con GameModel
const getGames = getX(GameModel);
const getGameBy = {
  uuid: getXbyY("uuid")(GameModel),
  title: getXbyY("title")(GameModel),
}
const deleteGameBy = {
  uuid: deleteXbyY("uuid")(GameModel),
  title: deleteXbyY("title")(GameModel),
}
const getGamesByName = CRUD_utils.getXbyY("name")(GameModel);
const deleteGameById = CRUD_utils.deleteXbyY("game", "id")(GameModel);
const updateGameBy = {
  id: CRUD_utils.updateXbyY("game", "id")(GameModel)(GameClass.getFields()),
  name: CRUD_utils.updateXbyY("game", "name")(GameModel)(GameClass.getFields()),
};

module.exports = {
  getGames,
  getGameBy,
  getGamesByName,
  deleteGameById,
  updateGameBy,
};
