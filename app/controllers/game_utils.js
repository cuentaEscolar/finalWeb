const fs = require("fs");
const path = require("path");
const CRUD_utils = require("./CRUD_utils.js");
const GameModel = require("../models/game");
const GameClass = require("./../src/js/game.js");

// Leer el archivo de datos JSON para cargar los juegos
const gameFile = path.join(__dirname, "./../data/games.json");
const gameJsonStr = fs.readFileSync(gameFile, "utf-8");
const rawGames = JSON.parse(gameJsonStr);

// Convertir los datos crudos del JSON a instancias de GameClass
let gameArr = [];
rawGames.forEach(element => {
  gameArr.push(GameClass.generateFromObject(element));
});

// Guardar los juegos en la base de datos utilizando el modelo
gameArr.forEach((game) => {
  GameModel(game).save().then((doc) => console.log("Game saved:", doc));
});

// Funciones CRUD para trabajar con GameModel
const getGames = CRUD_utils.getX(GameModel);
const getGamesById = CRUD_utils.getXbyY("id")(GameModel);
const getGamesByName = CRUD_utils.getXbyY("name")(GameModel);
const deleteGameById = CRUD_utils.deleteXbyY("game", "id")(GameModel);
const updateGameBy = {
  id: CRUD_utils.updateXbyY("game", "id")(GameModel)(GameClass.getFields()),
  name: CRUD_utils.updateXbyY("game", "name")(GameModel)(GameClass.getFields()),
};

module.exports = {
  getGames,
  getGamesById,
  getGamesByName,
  deleteGameById,
  updateGameBy,
};
