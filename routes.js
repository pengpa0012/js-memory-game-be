const express = require("express")
require("dotenv").config()
const router = express.Router()
const API = require('./utils.js');
const Scores = require("./model.js")

router.get("/getScores", API.authenticateKey, async (req, res) => {
  const result = await Scores.find()

  if(result) {
    return res.status(200).json({data: result})
  } else {
    return res.status(500).json({error: "Error"})
  }
})

router.post("/createScore", API.authenticateKey, async (req, res) => {
  const {difficulty, score} = req.body
  const newScore = new Scores({
    difficulty,
    score,
    date_created: Date.now()
  })
  console.log(newScore, score, difficulty, req.body)
  const result = await newScore.save()


  if(result) {
    return res.status(200).json({data: result, message: "Score Created!"})
  } else {
    return res.status(500).json({error: "Error"})
  }
})

module.exports = router