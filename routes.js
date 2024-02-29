const express = require("express")
require("dotenv").config()
const router = express.Router()
const API = require('./utils.js');
const Scores = require("./model.js")

router.get("/getScores", API.authenticateKey, async (req, res) => {
  const result = await Scores.find()

  return res.status(200).json({data: result})
})

router.post("/createScore", API.authenticateKey, async (req, res) => {
  const {difficulty, score} = req.body
  const newScore = new Scores({
    difficulty,
    score,
    date_created: Date.now()
  })
  const result = await newScore.save()

  return res.status(200).json({data: result, message: "Score Created!"})
})

module.exports = router