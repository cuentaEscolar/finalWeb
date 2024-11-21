"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let mongoDB = 'mongodb://localhost:27017/GamesDB';
let privateKey = process.env.TOKEN_KEY;

mongoose.connect(mongoDB, { useNewUrlParser: true });

let gameSchema = mongoose.Schema({

  rows : {
    type: String,
    require: true 
  },

  cols : {
    type: String,
    require: true 
  },

  title : {
    type: String,
    require: true 
  },

  topics : {
    type: String,
    require: true 
  },

  questions : {
    type: String,
    require: true 
  }, 

  answers : {
    type: String,
    require: true 
  },

  scores : {
    type: Number,
    require: true 
  },

  uuid : {
    type: String,
    require: true 
  },

  creatorUuid : {
    type: String,
    require: true 
  }, 

});

gameSchema.pre('save', function(next) {
  let user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  next();
})

gameSchema.methods.generateToken = function(password, salt) {
  let user = this;
  let payload = { _id: user._id, role: user.role };
  let options = { expiresIn: 60 * 60 }
  let salted = bcrypt.hashSync(password, salt);
  if (bcrypt.compareSync(salted, user.password)) {
    try {
      user.token = jwt.sign(payload, privateKey, options);
      return user.token;
    } catch (err) {
      console.log(err);
    }
  }
}

let Game = mongoose.model('game', gameSchema );

module.exports = Game;
