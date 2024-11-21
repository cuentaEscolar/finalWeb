"use strict";
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let mongoDB = 'mongodb://localhost:27017/UsersDB';
let privateKey = process.env.TOKEN_KEY;

mongoose.connect(mongoDB, { useNewUrlParser: true });

let userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  date: Date,
  image: String,
  role: {
    type: String,
    enum: ['ADMIN', 'USER', 'GUEST'],
    required: true
  },
});

userSchema.pre('save', function(next) {
  let user = this;
  user.password = bcrypt.hashSync(user.password, 10);
  next();
})

userSchema.methods.generateToken = function(password) {
  let user = this;
  let payload = { _id: user._id, role: user.role };
  let options = { expiresIn: 60 * 60 }
  if (bcrypt.compareSync(password, user.password)) {
    try {
      user.token = jwt.sign(payload, privateKey, options);
      return user.token;
    } catch (err) {
      console.log(err);
    }
  }
}

let User = mongoose.model('user', userSchema);

module.exports = User;
