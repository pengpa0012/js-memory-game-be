const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
  difficulty: { type: String, required: true },
  score: { type: String, required: true },
  date_created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Scores', scoreSchema);