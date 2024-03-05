const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const router = express.Router()
const { authenticateKey } = require('./utils.js')
const cookie = require("cookie")
const {Score, User} = require("./model.js")

router.post("/signup", async (req, res) => {
  const {username, password} = req.body
  const checkUsername = await User.find({username})

  if(checkUsername.length > 0) {
    res.status(500).send({message: "Username already exist"})
    return
  }
  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(password, salt)

  const result = await User.insertMany({username, password: hashPass})

  if(result) {
    res.status(200).send({message: "Successfully signup"})
  } else {
    res.status(500).send({message: "Error signup"})
  }
}) 

router.post("/login", async (req, res) => {
  const {username, password} = req.body
  const result = await User.find({username})

  if(result.length > 0 && await bcrypt.compare(password, result[0].password)) {
    const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"})

    // Set the token as an HTTP cookie
    res.setHeader('Set-Cookie', cookie.serialize('access_token', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
      sameSite: 'None',
      secure: true, // Set to true in production,
    }))

    res.status(200).send({message: "Login Successfully", accessToken: token})
  } else {
    res.status(500).send({message: "Error login"})
  }
})


router.get("/getScores", authenticateKey, async (req, res) => {
  const result = await Score.find()

  if(result) {
    res.status(200).json({data: result})
  } else {
    res.status(500).json({error: "Error"})
  }
})

router.post("/createScore", authenticateKey, async (req, res) => {
  const {difficulty, score} = req.body
  const newScore = new Score({
    difficulty,
    score,
    date_created: Date.now()
  })
  console.log(newScore, score, difficulty, req.body)
  const result = await newScore.save()


  if(result) {
    res.status(200).json({data: result, message: "Score Created!"})
  } else {
    res.status(500).json({error: "Error"})
  }
})

router.post('/logout', authenticateKey, (req, res) => {
  // Clear the token on the client side
  res.cookie("access_token", "", { httpOnly: true, secure: true, sameSite: "none", expires: new Date(0), path: '/' });
  res.json({ message: 'Logout successfully' })
})

module.exports = router