const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
  difficulty: { type: String, required: true },
  score: { type: String, required: true },
  date_created: {type: Date, default: Date.now()}
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = {
  User:  mongoose.model('Users', userSchema),
  Score: mongoose.model('Scores', scoreSchema),
}