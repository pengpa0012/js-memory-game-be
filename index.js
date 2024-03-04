const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const cors = require("cors")
const route = require("./routes")
const connectDB = require("./db")

const app = express()

connectDB()
// middleware
// Use the cors middleware
app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true, 
}));
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use("/", route)

const port = 3000

app.listen(port, () => {
  console.log("listening in port", port)
})