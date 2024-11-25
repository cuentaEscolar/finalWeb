"use strict";
const path = require("path");
const fs = require("fs");
const { raw } = require("express");

function QueryFactory(name, val) {
  let str = `{ "${name}" :"${val}"}`;
  return JSON.parse(str);
}
function advancedQueryFactory(names, vals) {
  let str = "{";
  let len = names.length;
  let subStr = [];
  for (let i = 0; i < len; i++) {
    subStr.push(` "${names[i]}" :"${vals[i]}"`);
  }
  str += subStr.join(",");
  str += "}";
  console.log(str)
  return JSON.parse(str);
}
const queryFromReqRes = yNames => (req, res) => {
  let yVals = [];
  yNames.forEach(element => {
    yVals.push(req.params[element]);
  });
  console.log(`yNames ${yNames}`);
  console.log(`yVals ${yVals}`);
  return advancedQueryFactory(yNames, yVals);
}
//It should be noted that g :: (req, res, ...theArgs) => IO
const fThenGonModelbyYs = f => g => yNames => Model => (req, res) => {
  let query = queryFromReqRes(yNames)(req, res);
  console.log(`query ${JSON.stringify(query)}`);
  Model[f](query).then(x => g(req, res, x));
}

const loadXandReturn = location => Model => Xclass => {
  let rawXs = JSON.parse(fs.readFileSync(path.join(__dirname, location)));
  let toRet = [];
  rawXs.forEach(element => {
    let X = Xclass.generateFromObject(element);
    let hadError = false;
    Model(X).save(
    ).then((doc) => console.log(doc)).catch((err) => {
      console.log(err);
      hadError = true;
      return;
    });
    if (hadError) return;
    toRet.push(X);
  });
  return toRet;
};

function getModelReqRes(f) {
  return function(Model) {
    return function(req, res) {
      f();
    }
  }
}

//const getX = Model => (req, res) => m 
function jsonRes(req, res, x) {
  res.status(200).json(x);
}
const getX = fThenGonModelbyYs("find")(jsonRes)([]);
const getXbyY = fThenGonModelbyYs("findOne")(jsonRes);

const createX = xName => Model => (req, res) => {
  let x = Model(req.body);
  x.save().then((x) => {
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(`${xName} ${x} was created!`);
  });
}

function updateXbyY(xName, yName) {
  return function(Model) {
    return function(fields) {
      return function(req, res) {
        let yVal = req.params[yName];
        let updatedX = req.body;
        for (let property in updatedX) {
          if (fields.includes(property)) continue;
          delete updatedX[property];
        }
        console.log(updatedX);
        let query = QueryFactory(yName, yVal);
        Model.findOneAndUpdate(query, updatedX, { new: true }).then(
          X => {
            res.type("text/plain; charset=utf-8")
            res.send(`${xName} ${X} was updated!`)
          });
      }
    }
  }

}
const deleteXbyYs = fThenGonModelbyYs("findOneAndDelete")((req, res, x) =>
  x != undefined ? `${x} was deleted` : `No such value was found`
);
function deleteXbyY(xName, yName) {
  return function(Model) {
    return function(req, res) {
      console.log(req);
      let yVal = req.params[yName];
      let query = QueryFactory(yName, yVal);
      Model.findOneAndDelete(query).then(X => {
        res.type("text/plain; charset=utf-8");
        res.send(X != undefined ?
          `${xName} ${X} was deleted. wau`
          : `No such ${xName} with ${yVal} ${yName} was found`
        );
      });
    }
  }
}
const dropModel = Model => (req, res) => Model.deleteMany({}).then(() => console.log("oops"));

module.exports = { loadXandReturn, getX, getXbyY, createX, deleteXbyY, updateXbyY, dropModel }

