const fs = require("fs");
const path = require("path");
const CRUD_utils = require("./CRUD_utils.js");
const RecordModel = require("../models/record");
const RecordClass = require("./../src/js/record.js");

// Leer el archivo de datos JSON para cargar los registros
const recordFile = path.join(__dirname, "./../data/records.json");
const recordJsonStr = fs.readFileSync(recordFile, "utf-8");
const rawRecords = JSON.parse(recordJsonStr);

// Convertir los datos crudos del JSON a instancias de RecordClass
let recordArr = [];
rawRecords.forEach(element => {
  recordArr.push(RecordClass.generateFromObject(element));
});

// Guardar los registros en la base de datos utilizando el modelo
recordArr.forEach((record) => {
  RecordModel(record).save().then((doc) => console.log("Record saved:", doc));
});

// Funciones CRUD para trabajar con RecordModel
const getRecords = CRUD_utils.getX(RecordModel);
const getRecordsById = CRUD_utils.getXbyY("id")(RecordModel);
const getRecordsByUserId = CRUD_utils.getXbyY("userId")(RecordModel);
const deleteRecordById = CRUD_utils.deleteXbyY("record", "id")(RecordModel);
const updateRecordBy = {
  id: CRUD_utils.updateXbyY("record", "id")(RecordModel)(RecordClass.getFields()),
  userId: CRUD_utils.updateXbyY("record", "userId")(RecordModel)(RecordClass.getFields()),
};

module.exports = {
  getRecords,
  getRecordsById,
  getRecordsByUserId,
  deleteRecordById,
  updateRecordBy,
};

