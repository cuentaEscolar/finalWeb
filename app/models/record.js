const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  teams: [{
    name: String,
    score: Number,
    members: [String]
  }],
  currentTurn: {
    teamIndex: Number,
    roundInfo: {
      theme: String,
      points: Number
    }
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  status: {
    type: String,
    enum: ['ONGOING', 'COMPLETED'],
    default: 'ONGOING'
  }
});

module.exports = mongoose.model('Record', RecordSchema);
