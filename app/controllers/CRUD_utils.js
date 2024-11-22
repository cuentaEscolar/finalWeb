"use strict";
function QueryFactory(name, val) {
  let str = `{ "${name}" :"${val}"}`;
  return JSON.parse(str);
}

function getModelReqRes(f) {
  return function(Model) {
    return function(req, res) {
      f();
    }
  }
}

function getX() {
  return function(Model) {
    return function(req, res) {
      Model.find({}).then(Xs => res.status(200).json(Xs));
    }
  }
}


function getXbyY(yName) {
  return function(Model) {
    return function(req, res) {
      let yVal = req.params[yStr];
      let query = QueryFactory(yName, yVal);
      Model.findOne(query).then(x => res.status(200).json(x));
    }
  }
}

function createX(xName) {
  return function(Model) {
    return function(req, res) {
      let x = Model(req.body);
      x.save().then((x) => {
        res.set("Content-Type", "text/plain; charset=utf-8");
        res.send(`${xName} ${x} was created!`)
      });
    }
  }
}

function updateXbyY(yName, yVal) {

}

function deleteXbyY(xName, yName) {
  return function(Model) {
    return function(req, res) {
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

module.exports = { getX, getXbyY, createX }

