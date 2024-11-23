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
      let yVal = req.params[yName];
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

module.exports = { getX, getXbyY, createX, deleteXbyY, updateXbyY }

