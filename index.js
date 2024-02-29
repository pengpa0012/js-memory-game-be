const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const route = require("./routes")
const connectDB = require("./db")

const app = express()

connectDB()
// middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use("/", route)

const port = 3000

app.listen(port, () => {
  console.log("listening in port", port)
})